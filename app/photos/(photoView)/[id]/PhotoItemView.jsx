"use client";

import { useEffect, useContext, useState } from "react";
import { GiCrane } from "react-icons/gi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import Layout from "../../../../components/Layout";
import PhotoView from "../../../../components/Photo";
import Panel, { PanelContext } from "../../../../components/Panel";
import Divider from "../../../../components/Divider";
import { Expand } from "../../../../components/Expand";

import DownArrow from "../../../../components/DownArrrow";

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

const Background = props => {
    return (
        <div className="w-full h-screen">
            <div style={{ height: "100%" }} className="w-full fixed">
                <div className="flex items-center overflow-hidden relative h-full">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

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
                <section className="flex flex-col items-center text-center">
                    <section className="flex flex-col items-center pt-12">
                        <GiCrane size={90} />
                        <p className="text-lg pt-2 pb-6">
                            Shop under construction
                        </p>
                        <Expand
                            renderHeader={(isExpanded, setExpanded) => {
                                return (
                                    <button
                                        className=" px-2 py-1 text-gray-900 mt-2 flex flex-row items-center"
                                        onClick={() => setExpanded(!isExpanded)}
                                    >
                                        <p className="text-sm pr-4">
                                            Still want one?
                                        </p>
                                        <section className="">
                                            {isExpanded ? (
                                                <AiOutlineMinus size={12} />
                                            ) : (
                                                <AiOutlinePlus size={12} />
                                            )}
                                        </section>
                                    </button>
                                );
                            }}
                        >
                            <p className="text-xs pt-2">
                                <div>File a custom order!</div>
                                <div>
                                    Digital download and custom prints available
                                    from $50
                                </div>
                            </p>
                        </Expand>
                    </section>
                    <section className="flex flex-col pt-8 absolute bottom-0 w-full px-4 max-w-xs">
                        <p className="text-sm pt-10">Custom orders available</p>
                        <p></p>
                        <a
                            className="my-3 p-3 hover:shadow-xl text-gray-300 focus:outline-none bg-teal-700 rounded"
                            href={`mailto:vwbthree.photos@gmail.com?subject=Interested%20in:%20${props.photo.title}`}
                            onClick={() => setSubmitted(true)}
                        >
                            Contact
                        </a>
                    </section>
                </section>
            )}
            {isSubmitted && (
                <section className="flex flex-col items-center pt-4">
                    <p className="text-lg font-semibold text-center">
                        Thank you for your interest!
                    </p>
                    <p className="text-center test-sm pt-2">
                        You will be contaced shortly
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
        <section className="pt-2 h-full">
            <DetailHeader>
                <div className="flex items-center justify-between">
                    <h1
                        className="text-2xl pl-6"
                        style={{ fontFamily: "Simsun" }}
                    >
                        {props.photo.displayName}
                    </h1>
                    <div className="flex flex-col items-center">
                        <button
                            className={`${
                                isPanelOpen
                                    ? "bg-white mt-2 rounded-full border border-gray-300 border-solid p-2 shadow-xl"
                                    : "bg-teal-700 rounded p-3"
                            }   text-white focus:outline-none `}
                            style={{ transition: "all .4s" }}
                            onClick={() => setPanelOpen(!isPanelOpen)}
                        >
                            {isPanelOpen ? (
                                <DownArrow style={{ height: "25px" }} />
                            ) : (
                                "Purchase"
                            )}
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
        <Layout
            isOpenDefault={false}
            navClass="bg-white"
            title={photo.displayName}
        >
            <Background>
                <PhotoView
                    photo={photo}
                    style={{
                        height: "80%"
                    }}
                    render={image => (
                        <div
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            {image}
                        </div>
                    )}
                />
            </Background>
            <Panel>
                <PanelContent photo={photo} />
            </Panel>
        </Layout>
    );
};

export default PhotoDetailPage;
