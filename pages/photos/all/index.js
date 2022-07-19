import CollectionDetailView from "../../../components/views/CollectionDetailView";
import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

export default CollectionDetailView;

export async function getStaticProps(context) {
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };

    var result = await db.scan(params).promise();
    const photos = result.Items;
    return { props: { photos, collection: "all" } };
}
