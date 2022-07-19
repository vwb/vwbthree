import CollectionDetailView from "../../../components/views/CollectionDetailView";

import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

export async function getStaticPaths() {
    //TODO: Get all possible collections
    //"proper" solution: in the upload script upload collections to their own dynamo table
    const TOP_LEVEL_LOCATIONS = [
        "california",
        "utah",
        "canyonlands",
        "santa-cruz",
        "yosemite",
        "whitney"
    ];

    return {
        paths: TOP_LEVEL_LOCATIONS.map(collection => ({
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
