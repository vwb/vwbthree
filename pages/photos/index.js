import Layout from "../../components/Layout";
import NavCard from "../../components/navCard";
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
                    linkText={props.name}
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
                />
            </a>
        </Link>
    </div>
);

const PhotosIndex = () => {
    return (
        <Layout isOpenDefault={false}>
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
            </main>
        </Layout>
    );
};

export default PhotosIndex;
