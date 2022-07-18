import Layout from "../../../components/Layout";
import NavCard from "../../../components/navCard";
import { Expand } from "../../../components/Expand";
import Link from "next/link";
import { db, PHOTO_DYNAMO_TABLE } from "../../../db";

// import PHOTO_COLLECTIONS from "../../data/photos/collections.json";

const PhotoGroupCard = props => (
    <div
        style={{ height: "450px", width: "400px" }}
        className="pt-6 px-4 object-center"
    >
        <Link
            href="/photos/collections/[props.slug]"
            as={`/photos/collections/${props.slug}`}
        >
            <a>
                <NavCard
                    blur={false}
                    img={props.url}
                    imgAlt={props.name}
                    containerStyles={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "350px",
                        fontFamily: "Simsun",
                        boxShadow: "1px 1px 5px gray",
                        fontSize: "1.15rem",
                        margin: "0 auto"
                    }}
                >
                    <div
                        style={{
                            background: "black",
                            padding: "8px",
                            paddingLeft: "12px",
                            paddingRight: "12px"
                        }}
                    >
                        {props.name}
                    </div>
                </NavCard>
            </a>
        </Link>
    </div>
);

const PhotosIndex = props => {
    return (
        <Layout title="Photos" navClass="shadow bg-white">
            <main className="pt-12 pb-6 max-w-screen-xl mx-auto">
                <div className="flex justify-center flex-wrap">
                    {Object.keys(props.descriptiveCollections).map(data => (
                        <PhotoGroupCard
                            key={data}
                            slug={data}
                            url={props.descriptiveCollections[data].url}
                            name={data}
                        />
                    ))}
                </div>
                <section className="text-center pt-10 text-gray-900">
                    <div>Other collections:</div>
                    {props.unlistedCollections.map(collection => (
                        <span className="pl-2 pr-2">{collection}</span>
                    ))}
                </section>
                <section className="text-center pt-20 text-gray-700 font-light">
                    <Expand
                        renderHeader={(isExpanded, setExpanded) => {
                            return (
                                <button
                                    onClick={() => setExpanded(!isExpanded)}
                                >
                                    Not able to find what you're looking for?
                                </button>
                            );
                        }}
                    >
                        <div className="px-6">
                            Shoot me an{" "}
                            <a
                                href={`mailto:vwbthree.photos@gmail.com?subject=Looking%20for%20something..`}
                                className="text-blue-500"
                            >
                                email
                            </a>
                            , or{" "}
                            <a
                                href="https://www.instagram.com/vwbthree/"
                                className="text-blue-500"
                            >
                                message me on Instagram
                            </a>{" "}
                            and lets get you set up.
                        </div>
                    </Expand>
                    <div className=""></div>
                </section>
            </main>
        </Layout>
    );
};

export default PhotosIndex;

export async function getStaticProps(context) {
    var params = {
        TableName: PHOTO_DYNAMO_TABLE
    };

    var result = await db.scan(params).promise();
    const photos = result.Items;

    const usedPhotos = new Set();
    const allCollections = new Set();

    const descriptiveCollections = photos.reduce((memo, item) => {
        const [_throwAway, ...itemCollections] = item.collections
            .replace(`#${item.location}`, "")
            .split("#");

        for (let collection of itemCollections) {
            collection = collection.trim();
            allCollections.add(collection);

            if (!memo[collection] && !usedPhotos.has(item.photoName)) {
                usedPhotos.add(item.photoName);
                memo[collection] = item;
            }
        }

        return memo;
    }, {});

    const unlistedCollections = [...allCollections].filter(
        collection => !descriptiveCollections[collection]
    );

    return {
        props: {
            descriptiveCollections,
            unlistedCollections: unlistedCollections,
            photos: photos
        }
    };
}
