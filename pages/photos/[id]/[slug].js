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
                top: "24px"
            }}
        >
            ⇣
        </div>
        <div
            style={{
                position: "absolute",
                right: "24px",
                top: "24px"
            }}
        >
            ⇣
        </div>
        <div
            className="text-center text-gray-800"
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
        className="z-20 h-300 relative  bg-gray-100 bg-opacity-0"
        style={{ marginTop: "-60px", height: "320px" }}
    >
        <div className="w-full sm:w-3/4 lg:w-1/2 xl:x-1/3 bg-gray-100 mx-auto h-full rounded-md shadow relative text-gray-800">
            {props.children}
        </div>
    </div>
);

const PhotoDetailPage = ({ photo }) => {
    return (
        <Layout isOpenDefault={false} navClass="bg-transparent">
            <BackGround>
                <PhotoView
                    photo={photo}
                    render={image => (
                        <div style={{ marginTop: "-30px" }}>{image}</div>
                    )}
                />
            </BackGround>
            <DetailPanel>
                <section className="pt-2">
                    <DetailHeader>
                        <h1 className="text-2xl">{photo.title}</h1>
                    </DetailHeader>
                    <div className="flex flex-col items-center p-4">
                        <div className="pt-6">
                            <button onClick={() => alert("Cool")}>
                                Contact for Purchase
                            </button>
                        </div>
                        <div className="w-3/4 pt-6 text-sm">
                            <div className>About the photo:</div>
                            {FAKE_DESCRIPTION}
                        </div>
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
