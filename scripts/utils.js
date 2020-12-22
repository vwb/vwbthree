const fs = require("fs");

const parseArgs = args =>
    args.reduce((memo, arg) => {
        [key, val] = arg.split("=");

        const trimmedKey = key.slice(2, key.length);

        return {
            ...memo,
            [trimmedKey]: val
        };
    }, {});

const IMAGE_FILE_PATH = "../data/photos/images.json";
const COLLECTIONS_FILE_PATH = "../data/photos/collections.json";

const loadImages = () => loadData({ filePath: IMAGE_FILE_PATH });
const loadCollections = () => loadData({ filePath: COLLECTIONS_FILE_PATH });

const saveImages = data => saveData({ filePath: IMAGE_FILE_PATH, data });
const saveCollection = data =>
    saveData({ filePath: COLLECTIONS_FILE_PATH, data });

const saveData = ({ filePath, data }) => {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync(filePath, dataJSON);
};

const loadData = ({ filePath }) => {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
};

const AWS_ROOT = "https://vwbthree-photos.s3-us-west-1.amazonaws.com";
const generateUrl = (name, collection) =>
    `${AWS_ROOT}/${collection}/${name}.jpg`;
const stringifyTitle = name =>
    name
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const addPhoto = ({ title, collection }) => {
    const images = loadImages();
    const photoValues = Object.values(images);
    const photoId = photoValues[photoValues.length - 1].id + 1;

    const photo = {
        url: generateUrl(title, collection),
        title: stringifyTitle(title),
        id: photoId
    };

    const updatedImages = {
        ...images,
        [photoId]: photo
    };

    saveImages(updatedImages);

    if (collection) {
        const collections = loadCollections();

        try {
            const collectionToUpdate = collections[collection];

            const updatedCollection = {
                ...collectionToUpdate,
                ids: [...collectionToUpdate.ids, photoId]
            };

            const updatedCollections = {
                ...collections,
                [collection]: updatedCollection
            };

            saveCollection(updatedCollections);
        } catch (e) {
            console.log(`Passed in collection: ${collection} doesn't exist`);
        }
    }
};

const removePhotos = ({ ids }) => {
    const images = loadImages();
    const imageIds = Object.keys(images).filter(
        imageId => ids.indexOf(imageId) === -1
    );
    const newImages = imageIds.reduce((memo, id) => {
        memo[id] = images[id];

        return memo;
    }, {});

    saveImages(newImages);
};

module.exports = {
    addPhoto,
    parseArgs,
    removePhotos
};
