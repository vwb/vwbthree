import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const createPresignedUrlWithClient = ({
    region = "us-west-1",
    bucket = "vwbthree-photos--private",
    key
}) => {
    const client = new S3Client({
        region,
        credentials: {
            accessKeyId: process.env.AWS_PHOTOS_DB_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
            secretAccessKey: process.env.AWS_PHOTOS_DB_SECRET_KEY // Do NOT HARD-CODE your secret credentials here
        }
    });
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 120 });
};

/**
 * Generates a presigned URL to full quality
 * photo for use by downstream.
 *
 * @param {*} assetId string
 * @returns string
 */
export async function createSignedDownloadUrlForAsset(assetId) {
    const url = await createPresignedUrlWithClient({ key: assetId });

    return url;
}
