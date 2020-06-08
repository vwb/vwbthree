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

const LinkButton = React.forwardRef(({ onClick, href, children }, ref) => (
    <a
        href={href}
        onClick={onClick}
        ref={ref}
        style={{ transition: "all 0.4s" }}
        className="text-xl my-5 px-5 py-3 rounded-sm border border-gray-200 cursor-pointer focus:shadow-lg hover:shadow-sm hover:text-gray-100 hover:border-gray-100"
    >
        {children}
    </a>
));

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
                                    <LinkButton passHref>
                                        Photography
                                    </LinkButton>
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
