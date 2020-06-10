import React, { useState, useEffect } from "react";

import Link from "next/link";
import Layout from "../components/Layout";
import ScrollArrow from "../components/ScrollArrow";
import LandingBackground from "../components/LandingBackground";
import FadeIn from "../components/FadeIn";

const Menu = props => {
    const [height, setMenuHeight] = useState(600);

    useEffect(() => {
        setMenuHeight(window.innerHeight * 0.8);
    }, []);

    return (
        <div
            id="landing-menu"
            className={`${props.isVisible ? "menu-visible" : "menu-hidden"}`}
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
    return (
        <a
            href={href}
            onClick={onClick}
            ref={ref}
            className="relative text-xl my-5 rounded-sm cursor-pointer focus:shadow-lg hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
        >
            <>
                <div
                    className="top-right absolute border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{ top: 0, right: 0 }}
                />
                <div
                    className="bottom-right absolute border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{ right: 0, bottom: 0 }}
                />
                <div
                    className="bottom-left absolute border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{ bottom: 0 }}
                />
                <div
                    className="top-left absolute border-solid border-gray-200 hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
                    style={{ left: 0 }}
                />
                <div className="px-5 py-3">{children}</div>
            </>
        </a>
    );
});

const Home = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const callback = entries => {
        let [entry] = entries;

        console.log("callback called");
        console.log(entry.isIntersecting);

        setMenuVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const options = {
            threshold: 0.25
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(document.querySelector("#landing-menu"));
    }, []);

    return (
        <div
            className={`landing ${isMenuVisible ? "blur" : ""}`}
            style={{ backgroundColor: "#1B1B1B" }}
        >
            <Layout
                isOpenDefault={false}
                navClass="t-0 l-10 bg-transparent"
                textColor="text-white"
            >
                <LandingBackground />
                <FadeIn>
                    <ScrollArrow />
                    <Menu isVisible={isMenuVisible}>
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
