import { useEffect, useContext, useState } from "react";
import Layout from "../../../components/Layout";
import PhotoView from "../../../components/Photo";
import Panel, { PanelContext } from "../../../components/Panel";
import Divider from "../../../components/Divider";
import { getAllPhotoPaths, getPhotoData } from "../../../lib/photos";

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
    const [emailInput, setEmailInput] = useState("");
    const [isSubmitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        //TODO: Contact Form
        //validate input is a valid email

        //post at to be created endpoint

        //store "submitted:photo-id" in local storage and
        //leverage that value for usestate on mount

        alert(
            "Thank you for your interest. \n This feature is still in development, please try again soon"
        );

        setSubmitted(true);
    };

    return (
        <section className="pt-4 px-4 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
            {!isSubmitted && (
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit}
                >
                    <p className="text-center">
                        Enter your email below to be contacted regarding
                        purchasing options
                    </p>
                    <div className="w-full flex px-4">
                        <label htmlFor="email-input" className="hidden">
                            Email
                        </label>
                        <input
                            id="email-input"
                            className="p-3 mt-4 flex-grow rounded text-gray-800 focus:outline-none"
                            type="email"
                            placeholder="example@domain.com"
                            value={emailInput}
                            onChange={e => setEmailInput(e.target.value)}
                        />
                    </div>
                    <p className="text-xs pt-2">
                        Digital download and custom prints available
                    </p>
                    <button
                        className="w-3/4 mt-5 p-3 hover:shadow-xl text-gray-300 focus:outline-none bg-teal-700 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
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
                        <ContactForm setPanelOpen={setPanelOpen} />
                    </FadeIn>
                </div>
            )}
        </section>
    );
};

const PhotoDetailPage = ({ photo }) => {
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
