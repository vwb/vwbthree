import { useEffect } from "react";
import Layout from "../../../components/Layout";
import PhotoView from "../../../components/Photo";
import { getAllPhotoPaths, getPhotoData } from "../../../lib/photos";

const FAKE_DESCRIPTION =
    "Just my luck, no ice. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Did he just throw my cat out of the window? This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Jaguar shark! So tell me - does it really exist?";

const DetailHeader = props => (
    <div className="mx-4">
        <div
            style={{
                position: "absolute",
                left: "24px",
                top: "20px"
            }}
        >
            ⇣
        </div>
        <div
            style={{
                position: "absolute",
                right: "24px",
                top: "20px"
            }}
        >
            ⇣
        </div>
        <div
            className="text-center pt-2"
            style={{
                fontFamily: "Gill Sans"
            }}
        >
            {props.children}
        </div>
    </div>
);

const BackGround = props => (
    <div className="w-full h-screen">
        <div style={{ height: "100%" }} className="w-full fixed">
            <div className="flex items-center overflow-hidden relative h-full">
                {props.children}
            </div>
        </div>
    </div>
);

const DetailPanel = props => (
    <div
        className="z-20 h-300 relative bg-opacity-0"
        style={{ marginTop: "-60px", height: "220px" }}
    >
        <div className="w-full sm:w-3/4 lg:w-1/2 xl:x-1/3 bg-gray-800 mx-auto h-full rounded-md shadow relative text-gray-200">
            {props.children}
        </div>
    </div>
);

const PhotoDetailPage = ({ photo }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, []);

    return (
        <Layout isOpenDefault={false} navClass="bg-transparent text-gray-200">
            <BackGround>
                <PhotoView
                    photo={photo}
                    backgroundOverlay="rgba(15, 15, 15, 0.65), rgba(15, 15, 15, 0.65))"
                    render={image => (
                        <div style={{ marginTop: "-50px" }}>{image}</div>
                    )}
                />
            </BackGround>
            <DetailPanel>
                <section className="pt-2">
                    <DetailHeader>
                        <h1 className="text-2xl">{photo.title}</h1>
                    </DetailHeader>
                    <div className="flex flex-col items-center pt-6 pb-4 px-4">
                        <button
                            className="rounded bg-teal-700 p-3 hover:shadow-xl "
                            onClick={() => alert("Cool")}
                        >
                            Contact for Purchase
                        </button>
                        <p
                            className="pt-2 text-gray-400 text-xs text-center"
                            style={{ maxWidth: "160px" }}
                        >
                            Custom prints and digital download available
                        </p>
                        {/* <div className="w-3/4 pt-6 text-sm">
                            <div>About the photo:</div>
                            {FAKE_DESCRIPTION}
                        </div> */}
                    </div>
                </section>
            </DetailPanel>
        </Layout>
    );
};

export async function getStaticPaths() {
    const paths = getAllPhotoPaths();

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const id = params.slug.split("--")[1];
    const photo = getPhotoData(id);

    return { props: { photo } };
}

export default PhotoDetailPage;
