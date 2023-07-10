export function getRootUrl() {
    const path = process.env.VERCEL_URL;

    if (path.includes("localhost:3000")) {
        return `http://${path}`;
    }

    return `https://${path}`;
}
