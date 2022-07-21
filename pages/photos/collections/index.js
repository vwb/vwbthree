import CollectionView from "../../../components/views/CollectionView";
import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

export default CollectionView;

export async function getStaticProps(context) {
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };

    var result = await db.scan(params).promise();
    const photos = result.Items;

    const usedPhotos = new Set();
    const allCollections = new Set();

    const collections = photos.reduce((memo, item) => {
        const [_throwAway, ...itemCollections] = item.collections
            .replace(`#${item.location}`, "")
            .split("#");

        for (let collection of itemCollections) {
            collection = collection.trim();
            allCollections.add(collection);

            if (!memo[collection] && !usedPhotos.has(item.photoName)) {
                usedPhotos.add(item.photoName);
                memo[collection] = item;
            }
        }

        return memo;
    }, {});

    const unlistedCollections = [...allCollections].filter(
        collection => !collections[collection]
    );

    return {
        props: {
            collections,
            unlistedCollections: unlistedCollections,
            photos: photos
        }
    };
}
