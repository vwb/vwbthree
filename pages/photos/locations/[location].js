import CollectionDetailView from "../../../components/views/CollectionDetailView";

import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

export async function getStaticPaths() {
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

    return {
        paths: [...locationSet].map(collection => ({
            params: { location: collection }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    //TODO: Fetch all photos that include the provided collection id
    const collection = params.location;
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
