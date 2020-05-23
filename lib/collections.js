import PHOTO_COLLECTIONS from "../data/photos/collections.json";
import PHOTOS_JSON from "../data/photos/images.json";

export const getAllCollectionPaths = () => {
    return Object.values(PHOTO_COLLECTIONS).map(collection => {
        let id = collection.slug;
        return { params: { id } };
    });
};

export const getCollectionData = id => {
    const { ids: photoIds } = PHOTO_COLLECTIONS[id];
    const photos = photoIds.map(id => PHOTOS_JSON[id]);

    return photos;
};
