import slugify from "slugify";
import PHOTOS_JSON from "../data/photos/images.json";

export const generatePhotoSlug = photo =>
    `${slugify(photo.title, { lower: true })}--${photo.id}`;

export const getAllPhotoPaths = () =>
    Object.values(PHOTOS_JSON).map(photo => ({
        params: {
            slug: generatePhotoSlug(photo)
        }
    }));

export const getPhotoData = id => PHOTOS_JSON[id];
