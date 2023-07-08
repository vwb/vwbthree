"use client";

import { FaLocationArrow } from "react-icons/fa";

import Layout from "../../../../components/Layout";
import PhotoView from "../../../../components/Photo";
import Panel from "../../../../components/Panel";
import Link from "next/link";

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

const PanelContent = props => {
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
                        <Link
                            href={`/photos/${props.photo.displayName}--${props.photo.photoName}/purchase`}
                        >
                            <span className="bg-teal-700 text-gray-200 mt-2 rounded-full border border-gray-300 border-solid p-4 shadow-xl">
                                Purchase
                            </span>
                        </Link>
                    </div>
                </div>
            </DetailHeader>
        </section>
    );
};

const CollectionPills = ({ location, collections }) => {
    const localLocation = location.split("#")[1];
    const formattedLocations = collections
        .split(localLocation)[1]
        .split("#")
        .slice(1);
    const pillContent = [localLocation, ...formattedLocations];

    return (
        <ul
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
            }}
        >
            {pillContent.map((item, index) => {
                const path =
                    index === 0
                        ? `/photos/locations/${item.toLowerCase()}`
                        : `/photos/collections/${item}`;
                return (
                    <li
                        key={item}
                        style={{
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            borderRadius: "20px",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            marginTop: "12px",
                            backgroundColor: "rgb(240, 240, 240)",
                            display: "inline-block",
                            marginRight: "12px",
                            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0))"
                        }}
                    >
                        <Link href={path}>
                            {index === 0 ? (
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <FaLocationArrow size={10} />
                                    <span style={{ paddingLeft: "4px" }} />
                                    {item.split("-").join(" ")}
                                </span>
                            ) : (
                                `#${item}`
                            )}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

const PhotoDetailPage = ({ photo }) => {
    return (
        <>
            <Background>
                <PhotoView
                    photo={photo}
                    style={{
                        height: "60%",
                        marginTop: "-15%",
                        width: "95%",
                        transform: "translateX(2.5%)"
                    }}
                    render={image => (
                        <div
                            onClick={e => {
                                e.stopPropagation();
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "120%",
                                alignItems: "center"
                            }}
                        >
                            <span
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    filter:
                                        "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.33))"
                                }}
                            >
                                {image}
                            </span>
                            <CollectionPills
                                location={photo.location}
                                collections={photo.collections}
                            />
                        </div>
                    )}
                />
            </Background>
            <Panel>
                <PanelContent photo={photo} />
            </Panel>
        </>
    );
};

export default PhotoDetailPage;
