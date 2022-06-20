const AWS = require("aws-sdk");
const fsPromises = require("fs/promises");
const path = require("path");
const { getImageMetaData } = require("../image");
const db = require("../../db");

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
const getImageUrl = key => `https://d1vk060ez13nog.cloudfront.net/${key}`;

/**takes a csv and directory. csv rows should match the photos. have following structure: */
/**
 * filename | photoName | summary | collection
 */
const main = async () => {
    //TODO: Support script level args and bulk images.
    // - support path to directory
    // - support path to accomponying CSV

    const s3 = new AWS.S3();

    let imageDataBuffer;
    let imageMetaData;

    try {
        const imagePath = path.join(
            __dirname,
            "../../../../Pictures/DSC07485.jpg"
        );
        imageDataBuffer = await fsPromises.readFile(imagePath);
        imageMetaData = await getImageMetaData(imageDataBuffer);
    } catch (e) {
        console.error(e);
        throw new Error("Unable to fetch or process file");
    }

    try {
        const params = {
            Bucket: PRIVATE_BUCKET,
            Key: "DSC07485.jpg",
            Body: imageDataBuffer,
            ContentType: "image"
        };
        await s3.putObject(params).promise();
    } catch (e) {
        console.error(e);
    }

    console.log(db);
};

main();
