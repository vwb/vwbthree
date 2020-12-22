import slugify from "slugify";
import PHOTOS_JSON from "../data/photos/images.json";
import PHOTO_COLLECTIONS from "../data/photos/collections.json";

export const generatePhotoSlug = photo =>
    `${slugify(photo.title, { lower: true })}--${photo.id}`;

export const getAllPhotoPaths = () => {
    let paths = [];

    Object.values(PHOTO_COLLECTIONS).forEach(collection => {
        let collectionPaths = collection.ids.map(id => ({
            params: {
                id: collection.slug,
                slug: generatePhotoSlug(PHOTOS_JSON[id])
            }
        }));

        paths = [...collectionPaths, ...paths];
    });

    return paths;
};

export const getPhotoData = id => PHOTOS_JSON[id];
