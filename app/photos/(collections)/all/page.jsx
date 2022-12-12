import CollectionDetailView from "../../../../components/views/CollectionDetailView";
import { db, PHOTO_DYNAMO_TABLE } from "../../../../db";

async function getAllPhotos() {
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };

    var result = await db.scan(params).promise();
    const photos = result.Items;
    return photos;
}

export default async function Page() {
    const photos = await getAllPhotos();

    // Forward fetched data to your Client Component
    return <CollectionDetailView collection="all" photos={photos} />;
}
