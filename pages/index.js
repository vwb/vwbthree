import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavCard from "../components/navCard";
import Layout from "../components/Layout";
import DownArrow from "../components/DownArrrow";

const Landing = () => {
    const [fadeVal, setFadeVal] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setFadeVal(0.75);
        }, 500);
    }, []);

    return (
        <section className="landing">
            <div className="nav-card nav-card--left">
                <NavCard
                    img="/waterfall.jpg"
                    imgAlt="Waterfall in Yosemite"
                    gradualBlur={true}
                    containerStyles={{
                        width: "100%",
                        height: "100%",
                        fontFamily: "Simsun",
                        fontSize: "1.45em"
                    }}
                >
                    {/* <div
                            className="rounded-lg shadow py-20 px-12"
                            style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
                        > */}
                    <button
                        className="focus:outline-none"
                        onClick={() =>
                            window.scrollBy(
                                window.scrollBy({
                                    top: window.outerHeight,
                                    left: 0,
                                    behavior: "smooth"
                                })
                            )
                        }
                        style={{
                            position: "absolute",
                            bottom: "200px",
                            opacity: fadeVal,
                            transition: "opacity 2s ease-in"
                        }}
                    >
                        <p className="text-sm text-center">Enter</p>
                        <DownArrow
                            style={{
                                height: "40px",
                                fill: "white"
                            }}
                            className=""
                        />
                    </button>

                    {/* </div> */}
                </NavCard>
            </div>
            <style jsx>{`
                .landing {
                    background-color: black;
                    scroll-snap-align: start;
                    height: 100vh;
                }
                .nav-card {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
            `}</style>
        </section>
    );
};

const Home = () => {
    return (
        <>
            <Landing />
            <Layout
                isOpenDefault={false}
                navClass="absolute t-0 l-10 bg-transparent"
                textColor="text-white"
            >
                <main className="relative">
                    <section className="h-screen w-screen bg-white"></section>
                </main>
            </Layout>
        </>
    );
};

export default Home;
