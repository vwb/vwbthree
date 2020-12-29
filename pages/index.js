import React, { useState, useEffect, useLayoutEffect} from "react";

import Link from "next/link";
import Layout from "../components/Layout";
import FadeIn from '../components/FadeIn';

const LandingBackground = props => {
    const [{ width, height }, setDimensions] = useState({
        width: "100vw",
        height: "100vh"
    });

    useLayoutEffect(() => {
        setDimensions({ width: window.outerWidth, height: window.outerHeight });

        document.getElementsByTagName("body")[0].style.backgroundColor =
            "#1B1B1B";

        return () => {
            document.getElementsByTagName("body")[0].style.backgroundColor =
                "initial";
        };
    }, []);

    const BACKGROUND_STYLE = `-webkit-linear-gradient(bottom, rgba(26, 26, 26, 1), rgba(25, 25, 25, 0.0) 15%), url(/waterfall.jpg)`;

    return (
        <section
            className="landing-background fixed"
            style={{
                marginTop: "-120px",
                height,
                width,
                background: BACKGROUND_STYLE,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            {props.children}
        </section>
    );
};

const Menu = props => {
    const [height, setMenuHeight] = useState(600);

    useLayoutEffect(() => {
        setMenuHeight(window.innerHeight * 0.8);
    }, []);

    return (
        <div
            id="landing-menu"
            className={`${props.isVisible ? "menu-visible" : "menu-hidden"}`}
            style={{
                width: "100%",
                height: `${height}px`,
                display: 'flex',
                alignItems: 'center'
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
                <div className="fade-in px-5 py-3">{children}</div>
            </>
        </a>
    );
});

const Home = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMenuVisible(true);
        }, 500)
    })

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
                        <Menu isVisible={isMenuVisible}>
                            <section className="flex items-center flex-col w-full">
                                <div
                                    className="text-center text-gray-200 font-light flex flex-col items-center"
                                    style={{
                                        height: "200px",
                                        width: "200px",
                                        fontFamily: "Simsun"
                                    }}
                                >
                                    <Link href="/photos">
                                        <LinkButton passHref>Photography</LinkButton>
                                    </Link>
                                    <div className="fade-in border border-solid border-gray-200 w-6" />
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
