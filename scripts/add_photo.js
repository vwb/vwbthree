const { addPhoto, parseArgs } = require("./utils");

// Handle arguments
const myArgs = process.argv.slice(2);

/**
 * Usage:
 *
 * node add_photo.js --title="cool-photo" --collection="collection_name"
 */
function main() {
    const parsedArgs = parseArgs(myArgs);

    if (
        Object.keys(parsedArgs).indexOf("title") === -1 ||
        Object.keys(parsedArgs).indexOf("collection") === -1
    ) {
        console.log(
            "Error with passed in argument. 'title' is a required argument."
        );
        return;
    }

    if (parsedArgs.title.indexOf(",") > -1) {
        parsedArgs.title.split(",").map(title => {
            addPhoto({ title, collection: parsedArgs.collection });
            console.log(
                `Successfully added photo: ${parsedArgs.title} to images.json`
            );
            console.log(
                `Successfully added photo: ${parsedArgs.title} to ${parsedArgs.collection}`
            );
        });
    } else {
        addPhoto(parsedArgs);
        console.log(
            `Successfully added photo: ${parsedArgs.title} to images.json`
        );
    }
}

main();
