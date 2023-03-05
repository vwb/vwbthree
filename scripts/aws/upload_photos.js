const AWS = require("aws-sdk");
const fsPromises = require("fs/promises");
const path = require("path");
const csvParser = require("csvtojson");
const { getImageMetaData } = require("../image");

require("dotenv").config({
    path: path.join(__dirname, "../../.env.local"),
    debug: true
});

AWS.config.update({
    accessKeyId: process.env.AWS_PHOTOS_DB_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
    secretAccessKey: process.env.AWS_PHOTOS_DB_SECRET_KEY, // Do NOT HARD-CODE your secret credentials here
    region: "us-west-1"
});

const PRIVATE_BUCKET = "vwbthree-photos--private";
const DYNAMO_TABLE = "vwbthree--photos--test";
const getImageUrl = key => `https://d1vk060ez13nog.cloudfront.net/${key}`;

/**
 * takes a csv and directory.
 *
 * csv rows should match the photos. have following structure:
 * filename | photoName | summary | collection
 *
 * call the script with `npm run upload_images`
 *
 * will access `website_photos_v2` directory and using the
 * csv located there. It will then upload any photo marked with
 * uploaded = "FALSE".
 *
 *
 */
const main = async () => {
    const imageFolderPath = path.join(
        __dirname,
        "../../../../Pictures/website_photos_v2"
    );

    const files = await fsPromises.readdir(imageFolderPath, {
        withFileTypes: true
    });
    const imageNames = files
        .filter(item => !item.isDirectory() && item.name.includes(".jpg"))
        .map(item => item.name);

    const csvFileName = files
        .filter(item => !item.isDirectory() && item.name.includes(".csv"))
        .map(item => item.name);

    const csvFilePath = `${imageFolderPath}/${csvFileName}`;
    const parsedCSV = await csvParser().fromFile(csvFilePath);
    const photosToUpload = parsedCSV.filter(item => item.uploaded === "FALSE");

    console.log(parsedCSV);

    const s3 = new AWS.S3();
    const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

    let imageDataBuffer;
    let imageMetaData;

    //TODO: Update scrip to do all the actions in bulk. Squoosh can handle multiple
    //images at the same time.
    //add a comment
    for (const imageToUpload of photosToUpload) {
        const { fileName, name, collection, location, summary } = imageToUpload;

        try {
            const imagePath = path.join(
                __dirname,
                `../../../../Pictures/website_photos_v2/${fileName}`
            );
            imageDataBuffer = await fsPromises.readFile(imagePath);
            imageMetaData = await getImageMetaData(imageDataBuffer);
            console.info(`Generated metadata for ${fileName}`);
        } catch (e) {
            console.error(e);
            throw new Error("Unable to find, or parse image", e);
        }

        // TODO: check if filename exists in S3 already before writing
        try {
            const params = {
                Bucket: PRIVATE_BUCKET,
                Key: fileName,
                Body: imageDataBuffer,
                ContentType: "image"
            };
            await s3.putObject(params).promise();
            console.info("Successfully uploaded image", fileName);
        } catch (e) {
            console.error(e);
            throw new Error("Unable to upload to S3", e);
        }

        try {
            const fileWithNoExtension = fileName.split(".")[0];
            const params = {
                TableName: DYNAMO_TABLE,
                Item: {
                    photoName: fileWithNoExtension,
                    collections: `#${location}#${collection}`,
                    displayName: name,
                    url: getImageUrl(fileName),
                    location: location,
                    ratio: imageMetaData.ratio,
                    orientation: imageMetaData.orientation,
                    summary: summary,
                    metaData: {
                        height: imageMetaData.height,
                        width: imageMetaData.width,
                        size: imageMetaData.size,
                        fileName: fileName
                    }
                }
            };

            // TODO: Check if item exists in dynamo table before uploading
            await db.put(params).promise();
            console.info("Successfully uploaded image to Dynamo", fileName);
        } catch (e) {
            console.error(e);
            throw new Error("Failed to post photo to dynamo db");
        }
    }

    return null;
};

main().then(() => {
    console.log("Script complete.");
    return;
});
