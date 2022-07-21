import CollectionDetailView from "../../../components/views/CollectionDetailView";

import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

export async function getStaticPaths() {
    //TODO: Get all possible collections
    //"proper" solution: in the upload script upload collections to their own dynamo table
    const COLLECTIONS = [
        "layers",
        "minimal",
        "desert",
        "mountain",
        "ocean",
        "surf",
        "reflection",
        "winter",
        "lake",
        "sunrise",
        "forest",
        "halfdome"
    ];

    return {
        paths: [...COLLECTIONS].map(collection => ({
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

        console.log(result);
    } catch (e) {
        console.error("failed");
        console.error(e);
    }

    // const photos = getCollectionData(params.id);
    // const collection = getCollection(params.id);
    return { props: { photos, collection } };
}

export default CollectionDetailView;
