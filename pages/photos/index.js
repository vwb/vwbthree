import Layout from "../../components/Layout";
import NavCard from "../../components/navCard";
import { Expand } from "../../components/Expand";
import Link from "next/link";

import PHOTO_COLLECTIONS from "../../data/photos/collections.json";

const PhotoGroupCard = props => (
    <div
        style={{ height: "450px", width: "400px" }}
        className="pt-6 px-4 object-center"
    >
        <Link href="/photos/[props.slug]" as={`/photos/${props.slug}`}>
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
                    {props.name}
                </NavCard>
            </a>
        </Link>
    </div>
);

const PhotosIndex = () => {
    return (
        <Layout title="Photos" navClass="shadow bg-white">
            <main className="pt-12 pb-6 max-w-screen-xl mx-auto">
                <div className="flex justify-center flex-wrap">
                    {Object.values(PHOTO_COLLECTIONS).map(data => (
                        <PhotoGroupCard
                            key={data.slug}
                            slug={data.slug}
                            url={data.coverPhotoUrl}
                            name={data.name}
                        />
                    ))}
                </div>
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
