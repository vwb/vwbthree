import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import NavCard from "../../components/navCard";

const PhotosIndex = props => {
    return (
        <Layout title="Photos" navClass="shadow bg-white">
            <main className="pt-12 pb-6 max-w-screen-xl mx-auto">
                <h2
                    className="flex justify-center pt-6"
                    style={{ fontFamily: "Simsun" }}
                >
                    Browse by
                </h2>
                <div className="flex justify-center flex-wrap">
                    <div
                        style={{ height: "450px", width: "400px" }}
                        className="pt-6 px-4 object-center"
                    >
                        <Link href="photos/collections/">
                            <a>
                                <NavCard
                                    blur={false}
                                    img={
                                        "https://d1vk060ez13nog.cloudfront.net/DSC07787.jpg"
                                    }
                                    imgAlt={"collections"}
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
                                    <div
                                        style={{
                                            background: "black",
                                            padding: "8px",
                                            paddingLeft: "12px",
                                            paddingRight: "12px"
                                        }}
                                    >
                                        {"collections"}
                                    </div>
                                </NavCard>
                            </a>
                        </Link>
                    </div>
                    <div
                        style={{ height: "450px", width: "400px" }}
                        className="pt-6 px-4 object-center"
                    >
                        <Link href="photos/locations/">
                            <a>
                                <NavCard
                                    blur={false}
                                    img={
                                        "https://d1vk060ez13nog.cloudfront.net/DSC07495.jpg"
                                    }
                                    imgAlt={"location"}
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
                                    <div
                                        style={{
                                            background: "black",
                                            padding: "8px",
                                            paddingLeft: "12px",
                                            paddingRight: "12px"
                                        }}
                                    >
                                        {"location"}
                                    </div>
                                </NavCard>
                            </a>
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default PhotosIndex;
