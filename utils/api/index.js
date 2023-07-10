const PATH = process.env.VERCEL_URL;

export function getRootUrl() {
    if (PATH.includes("localhost:3000")) {
        return `http://${PATH}`;
    }

    return `https://${PATH}`;
}
