const { parseArgs, removePhotos } = require("./utils");

// Handle arguments
const myArgs = process.argv.slice(2);

function main() {
    const parsedArgs = parseArgs(myArgs);

    if (Object.keys(parsedArgs).indexOf("ids") === -1) {
        console.log(
            "Error with passed in argument. 'ids' is a required argument."
        );
        return;
    }

    try {
        removePhotos({ ids: parsedArgs.ids.split(",") });
        console.log("Successfully removed photos");
    } catch {
        console.log("Error deleting photos");
    }
}

main();
