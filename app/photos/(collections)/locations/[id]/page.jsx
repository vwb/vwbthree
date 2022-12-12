import CollectionDetailView from "../../../../../components/views/CollectionDetailView";

import { db, PHOTO_DYNAMO_TABLE } from "../../../../../db";

export async function generateStaticParams() {
    //TODO: Get all possible collections
    //"proper" solution: in the upload script upload collections to their own dynamo table
    const locationSet = new Set();
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };
    var result = await db.scan(params).promise();
    const photos = result.Items;

    for (const photo of photos) {
        const photoLocation = photo.location.split("#")[1];
        locationSet.add(photoLocation);
    }

    return [...locationSet].map(collection => ({ id: collection }));
}

export async function getCollectionData(params) {
    //TODO: Fetch all photos that include the provided collection id
    const collection = params.id;
    let photos = [];

    var params = {
        TableName: PHOTO_DYNAMO_TABLE,
        ExpressionAttributeValues: {
            ":collection": collection
        },
        FilterExpression: "contains(collections,:collection)"
    };

    try {
        const result = await db.scan(params).promise();
        photos = result.Items;
    } catch (e) {
        console.error("failed");
        console.error(e);
    }

    return { photos, collection };
}

export default async function Page({ params }) {
    const collectionData = await getCollectionData(params);

    // Forward fetched data to your Client Component
    return (
        <CollectionDetailView
            photos={collectionData.photos}
            collection={collectionData.collection}
        />
    );
}
