import CollectionDetailView from "../../../components/views/CollectionDetailView";

import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

export async function getStaticPaths() {
    //TODO: Get all possible collections
    //"proper" solution: in the upload script upload collections to their own dynamo table
    const collectionSet = new Set();
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };
    var result = await db.scan(params).promise();
    const photos = result.Items;

    for (const photo of photos) {
        const photoLocation = photo.location;
        const collections = photo.collections.split("#");

        for (const collection of collections) {
            if (!photoLocation.includes(collection)) {
                collectionSet.add(collection);
            }
        }
    }

    return {
        paths: [...collectionSet].map(collection => ({
            params: { id: collection }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
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

    // const photos = getCollectionData(params.id);
    // const collection = getCollection(params.id);
    return { props: { photos, collection } };
}

export default CollectionDetailView;
