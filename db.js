const AWS = require("aws-sdk");

const PHOTO_DYNAMO_TABLE = "vwbthree--photos--test";
AWS.config.update({
    accessKeyId: process.env.AWS_PHOTOS_DB_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
    secretAccessKey: process.env.AWS_PHOTOS_DB_SECRET_KEY, // Do NOT HARD-CODE your secret credentials here
    region: "us-west-1"
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

module.exports = { db, PHOTO_DYNAMO_TABLE };
