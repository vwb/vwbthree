import { useEffect, useContext, useState } from "react";
import Layout from "../../../components/Layout";
import PhotoView from "../../../components/Photo";
import Panel, { PanelContext } from "../../../components/Panel";
import Divider from "../../../components/Divider";
import { getAllPhotoPaths, getPhotoData } from "../../../lib/photos";

const FAKE_DESCRIPTION =
    "Just my luck, no ice. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Did he just throw my cat out of the window? This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Jaguar shark! So tell me - does it really exist?";

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

const BackGround = props => (
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

const ContactForm = () => {
    return (
        <section className="pt-4 px-4 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
            <form className="flex flex-col items-center">
                <p className="text-center">
                    Enter your email below and I will contact you shortly
                </p>
                <div className="w-full flex px-4">
                    <label htmlFor="email-input" className="hidden">
                        Email
                    </label>
                    <input
                        id="email-input"
                        className="p-3 mt-4 flex-grow rounded text-gray-800 focus:outline-none"
                        type="text"
                        placeholder="example@domain.com"
                    />
                </div>
                <p className="text-xs pt-2">
                    Digital download and custom prints available
                </p>
                <button className="w-3/4 mt-5 p-3 hover:shadow-xl text-gray-300 focus:outline-none bg-teal-700 rounded">
                    Submit
                </button>
            </form>
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
                                    ? "bg-transparent"
                                    : "bg-teal-700 rounded"
                            }   p-3 hover:shadow-xl text-gray-300 focus:outline-none`}
                            style={{ transition: "all .4s" }}
                            onClick={() => setPanelOpen(!isPanelOpen)}
                        >
                            {isPanelOpen ? "⬇" : "Contact for Purchase"}
                        </button>
                    </div>
                </div>
            </DetailHeader>
            {isPanelOpen && (
                <div className="pt-4">
                    <FadeIn>
                        <Divider />
                        <ContactForm />
                    </FadeIn>
                </div>
            )}
        </section>
    );
};

const PhotoDetailPage = ({ photo }) => {
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
            <Panel>
                <PanelContent photo={photo} />
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
    const id = params.slug.split("--")[1];
    const photo = getPhotoData(id);

    return { props: { photo } };
}

export default PhotoDetailPage;
