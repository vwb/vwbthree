import PhotoItemView from "./PhotoItemView";
import { db, PHOTO_DYNAMO_TABLE } from "../../../../db";

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
