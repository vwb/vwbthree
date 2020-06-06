import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ScrollArrow from "../components/ScrollArrow";

import { useScrollListener } from "../hooks";

const LandingBackground = props => {
    const [blur, setBlur] = useState(0);
    const [{ width, height }, setDimensions] = useState({
        width: "100vw",
        height: "100vh"
    });

    const handleScroll = () => {
        setBlur(window.scrollY / 50);
    };

    useScrollListener(handleScroll);

    useEffect(() => {
        handleScroll();
        setDimensions({ width: window.outerWidth, height: window.outerHeight });
    }, []);

    return (
        <section
            className="fixed"
            style={{
                height,
                width,
                backgroundColor: "#1B1B1B",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <section
                className="fixed w-full h-full"
                style={{
                    backgroundImage: "url(/waterfall.jpg)",
                    backgroundSize: "initial",
                    backgroundPosition: "center",
                    filter: `blur(${blur}px)`
                }}
            >
                {props.children}
            </section>
        </section>
    );
};

const Menu = props => {
    const [height, setMenuHeight] = useState(600);

    useEffect(() => {
        setMenuHeight(window.innerHeight * 0.8);
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: `${height}px`,
                position: "absolute",
                bottom: `-${height}px`
            }}
        >
            {props.children}
        </div>
    );
};

const FadeIn = props => {
    const [fadeVal, setFadeVal] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setFadeVal(0.9);
        }, 600);
    }, []);

    return (
        <div
            className="h-full w-full"
            style={{ opacity: fadeVal, transition: "opacity 2s" }}
        >
            {props.children}
        </div>
    );
};

const Home = () => {
    return (
        <>
            <Layout
                isOpenDefault={false}
                navClass="t-0 l-10 bg-transparent"
                textColor="text-white"
            >
                <LandingBackground />
                <FadeIn>
                    <ScrollArrow />
                    <Menu>
                        <section className="flex items-center flex-col">
                            <div
                                className="text-center text-gray-100 weight-light flex flex-col items-center"
                                style={{
                                    height: "200px",
                                    width: "200px",
                                    fontFamily: "Simsun"
                                }}
                            >
                                <Link href="/photos">
                                    <a className="text-2xl my-4">Photography</a>
                                </Link>
                                • • •
                                <Link href="/about">
                                    <a className="text-2xl my-4">About</a>
                                </Link>
                            </div>
                        </section>
                    </Menu>
                </FadeIn>
            </Layout>
        </>
    );
};

export default Home;
