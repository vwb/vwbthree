import PhotoItemView from "./PhotoItemView";
import { db, PHOTO_DYNAMO_TABLE } from "../../../../db";
import { createSignedDownloadUrlForAsset } from "../../../../utils/assets";

export async function generateStaticParams() {
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };

    var result = await db.scan(params).promise();
    const photos = result.Items;

    const paths = photos.map(item => ({
        id: `${item.displayName}--${item.photoName}`
    }));

    return paths;
}

/**
 * 
 * @param {} params 
 * @returns
 * {
  displayName: 'oak-in-yosemite',
  summary: 'Wouldya look at that.',
  location: 'california#yosemite',
  metaData: {
    width: 3704,
    fileName: 'DSC09372.jpg',
    size: 15335180,
    height: 4545
  },
  ratio: 1.2,
  collections: '#california#yosemite#halfdome#winter',
  photoName: 'DSC09372',
  orientation: 'portait',
  url: 'https://d1vk060ez13nog.cloudfront.net/DSC09372.jpg'
} 
 */
export async function getPhotoData(params) {
    const id = params.id.split("--")[1];

    var params = {
        TableName: PHOTO_DYNAMO_TABLE,
        ExpressionAttributeValues: {
            ":photoName": id
        },
        KeyConditionExpression: "photoName = :photoName"
    };

    try {
        const result = await db.query(params).promise();
        const photo = result.Items[0];

        return photo;
    } catch (e) {
        console.error("failed");
        console.error(e);
    }

    return [];
}

export default async function Page({ params }) {
    const photoData = await getPhotoData(params);

    // Forward fetched data to your Client Component
    return <PhotoItemView photo={photoData} />;
}
