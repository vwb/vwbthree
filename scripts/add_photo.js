// Move DATA files to JSON
const fs = require("fs");

// Handle arguments
const myArgs = process.argv.slice(2);

const parseArgs = args =>
    args.reduce((memo, arg) => {
        [key, val] = arg.split("=");

        const trimmedKey = key.slice(2, key.length);

        return {
            ...memo,
            [trimmedKey]: val
        };
    }, {});

function main() {
    const parsedArgs = parseArgs(myArgs);

    if (
        Object.keys(parsedArgs).indexOf("url") === -1 ||
        Object.keys(parsedArgs).indexOf("title") === -1
    ) {
        console.log(
            "Error with passed in argument. 'url' and 'title' are required arguments."
        );
        return;
    }

    addPhoto(parsedArgs);

    console.log(`Successfully added photo: ${parsedArgs.title} to images.json`);

    if (parsedArgs.collection) {
        console.log(
            `Successfully added photo: ${parsedArgs.title} to ${parsedArgs.collection}`
        );
    }
}

const addPhoto = ({ url, title, collection }) => {
    const images = loadImages();

    const photoId = Object.keys(images).length;

    const photo = {
        url,
        title,
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

//File Getters and Parsers
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

main();
