const os = require("os");
const squoosh = require("@squoosh/lib");

const ImagePool = squoosh.ImagePool;
const cpus = os.cpus;

const getImageMetaData = async imageBuffer => {
    const imagePool = new ImagePool(cpus().length);
    const squooshImage = imagePool.ingestImage(imageBuffer);
    const imageInformation = await squooshImage.decoded;

    const height = imageInformation.bitmap.height;
    const width = imageInformation.bitmap.width;
    const size = imageInformation.size;

    const isLandscape = width >= height;

    const ratio = isLandscape ? width / height : height / width;
    const normalizedRatio = Math.round(10 * ratio) / 10;

    return {
        height,
        width,
        size,
        ratio: normalizedRatio,
        orientation: isLandscape ? "landscape" : "portait"
    };
};

module.exports = {
    getImageMetaData
};
