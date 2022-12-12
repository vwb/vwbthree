import CollectionView from "../../../../components/views/CollectionView";
import { db, PHOTO_DYNAMO_TABLE } from "../../../../db";

async function getLocationCollections() {
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };

    var result = await db.scan(params).promise();
    const photos = result.Items;

    const usedPhotos = new Set();
    const allLocations = new Set();

    const collections = photos.reduce((memo, item) => {
        let location = item.location.split("#")[1];

        location = location.trim();
        allLocations.add(location);

        if (!memo[location] && !usedPhotos.has(item.photoName)) {
            usedPhotos.add(item.photoName);
            memo[location] = item;
        }

        return memo;
    }, {});

    const unlistedCollections = [...allLocations].filter(
        collection => !collections[collection]
    );

    return {
        collections,
        unlistedCollections: unlistedCollections,
        photos: photos
    };
}

export default async function Page() {
    const collectionData = await getLocationCollections();

    // Forward fetched data to your Client Component
    return (
        <CollectionView
            isLocationView={true}
            collections={collectionData.collections}
            unlistedCollections={collectionData.unlistedCollections}
            photos={collectionData.photos}
        />
    );
}
