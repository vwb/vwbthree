import { PHOTO_GROUPS } from "../../data/photos";
import Layout from "../../components/layout";
import NavCard from "../../components/navCard";
import Link from "next/link";

const PhotoGroupCard = props => (
    <div style={{ height: "450px" }} className="pt-6 px-4 object-center">
        <Link href="/photos/[props.slug]" as={`/photos/${props.slug}`}>
            <a>
                <NavCard
                    blur={false}
                    linkHref={props.slug}
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
            <div className="pt-12 pb-6">
                {Object.values(PHOTO_GROUPS).map(data => (
                    <PhotoGroupCard
                        key={data.slug}
                        slug={data.slug}
                        url={data.coverPhotoUrl}
                        name={data.name}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default PhotosIndex;
