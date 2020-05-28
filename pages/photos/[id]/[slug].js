import { useEffect, useContext, useState } from "react";
import Layout from "../../../components/Layout";
import PhotoView from "../../../components/Photo";
import Panel, { PanelContext } from "../../../components/Panel";
import Divider from "../../../components/Divider";
import { getAllPhotoPaths, getPhotoData } from "../../../lib/photos";
import { getCollection } from "../../../lib/collections";

const DetailHeader = props => (
    <div className="mx-4">
        <div
            style={{
                fontFamily: "Gill Sans"
            }}
        >
            {props.children}
        </div>
    </div>
);

const Background = props => (
    <div className="w-full h-screen">
        <div style={{ height: "100%" }} className="w-full fixed">
            <div className="flex items-center overflow-hidden relative h-full">
                {props.children}
            </div>
        </div>
    </div>
);

const FadeIn = props => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div
            style={{ opacity: `${isMounted ? 1 : 0}`, transition: "all 0.4s" }}
        >
            {props.children}
        </div>
    );
};

const ContactForm = props => {
    const [isSubmitted, setSubmitted] = useState(false);

    return (
        <section className="pt-4 px-4 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
            {!isSubmitted && (
                <section className="flex flex-col items-center">
                    <p className="text-center">
                        Contact via email and I will reach out shortly to
                        finalize purchasing options!
                        <p className="text-xs pt-2">
                            Digital download and custom prints available
                        </p>
                    </p>
                    <a
                        className="my-3 p-3 hover:shadow-xl text-gray-300 focus:outline-none bg-teal-700 rounded"
                        href={`mailto:vwbthree.photos@gmail.com?subject=Interested%20in:%20${props.photo.title}%20in%20the%20${props.collection.name}%20Collection`}
                        onClick={() => setSubmitted(true)}
                    >
                        Contact
                    </a>
                </section>
            )}
            {isSubmitted && (
                <section className="flex flex-col items-center pt-4">
                    <p className="text-lg font-semibold text-center">
                        Thank you for your interest!
                    </p>
                    <p className="text-center test-sm pt-2">
                        Keep an eye on your email and I will reaching out in the
                        next few days.
                    </p>
                    <button
                        className="p-3 my-4 border-2 border-solid border-gray-400 rounded"
                        onClick={() => props.setPanelOpen(false)}
                    >
                        Close
                    </button>
                </section>
            )}
        </section>
    );
};

const PanelContent = props => {
    const [isPanelOpen, setPanelOpen] = useContext(PanelContext);

    return (
        <section className="pt-2">
            <DetailHeader>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl pl-6">{props.photo.title}</h1>
                    <div className="flex flex-col items-center">
                        <button
                            className={`${
                                isPanelOpen
                                    ? "bg-transparent mt-2"
                                    : "bg-teal-700 rounded"
                            }   p-3 hover:shadow-xl text-gray-300 focus:outline-none`}
                            style={{ transition: "all .4s" }}
                            onClick={() => setPanelOpen(!isPanelOpen)}
                        >
                            {isPanelOpen ? "⇣" : "Purchase"}
                        </button>
                    </div>
                </div>
            </DetailHeader>
            {isPanelOpen && (
                <div className="pt-4">
                    <FadeIn>
                        <Divider />
                        <ContactForm
                            setPanelOpen={setPanelOpen}
                            photo={props.photo}
                            collection={props.collection}
                        />
                    </FadeIn>
                </div>
            )}
        </section>
    );
};

const PhotoDetailPage = ({ photo, collection }) => {
    return (
        <Layout isOpenDefault={false} navClass="bg-transparent text-gray-200">
            <Background>
                <PhotoView
                    photo={photo}
                    backgroundOverlay="rgba(15, 15, 15, 0.65), rgba(15, 15, 15, 0.65))"
                    render={image => (
                        <div style={{ marginTop: "-50px" }}>{image}</div>
                    )}
                />
            </Background>
            <Panel>
                <PanelContent photo={photo} collection={collection} />
            </Panel>
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
    const photoId = params.slug.split("--")[1];
    const photo = getPhotoData(photoId);
    const collection = getCollection(params.id);

    return { props: { photo, collection } };
}

export default PhotoDetailPage;
