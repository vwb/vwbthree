import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import ScrollArrow from "../components/ScrollArrow";
import LandingBackground from "../components/LandingBackground";
import FadeIn from "../components/FadeIn";
import { useScrollListener } from "../hooks";

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

const LinkButton = React.forwardRef(({ onClick, href, children }, ref) => {
    const [percentage, setPercentage] = useState(0);
    const [height, setHeight] = useState(600);

    const handleScroll = () => {
        const percentageToSet = ((window.scrollY * 0.9) / height) * 100;

        setPercentage(Math.min(percentageToSet, 100));
    };

    useScrollListener(handleScroll);

    useEffect(() => {
        setHeight(window.innerHeight * 0.8);

        handleScroll();
    }, []);

    return (
        <a
            href={href}
            onClick={onClick}
            ref={ref}
            style={{ transition: "all 0.2s" }}
            className="relative text-xl my-5 rounded-sm cursor-pointer focus:shadow-lg hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
        >
            <>
                <div
                    className="absolute border border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{
                        top: 0,
                        right: 0,
                        width: `${percentage}%`
                    }}
                />
                <div
                    className="absolute border border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{
                        right: 0,
                        bottom: 0,
                        height: `${percentage}%`
                    }}
                />
                <div
                    className="absolute border border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{
                        bottom: 0,
                        width: `${percentage}%`
                    }}
                />
                <div
                    className="absolute border border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{
                        left: 0,
                        height: `${percentage}%`
                    }}
                />
                <div className="px-5 py-3">{children}</div>
            </>
        </a>
    );
});

const Home = () => {
    return (
        <div style={{ backgroundColor: "#1B1B1B" }}>
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
                                className="text-center text-gray-200 font-light flex flex-col items-center"
                                style={{
                                    height: "200px",
                                    width: "200px",
                                    fontFamily: "Simsun"
                                }}
                            >
                                <Link href="/photos">
                                    <LinkButton passHref>Gallery</LinkButton>
                                </Link>
                                <div className="border border-solid border-gray-200 w-6" />
                                <Link href="/about">
                                    <LinkButton passHref>About</LinkButton>
                                </Link>
                            </div>
                        </section>
                    </Menu>
                </FadeIn>
            </Layout>
        </div>
    );
};

export default Home;
