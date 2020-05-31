import React from "react";
import Link from "next/link";
import NavCard from "../components/navCard";
import Layout from "../components/Layout";

const Home = () => {
    return (
        <Layout
            isOpenDefault={false}
            navClass="bg-transparent"
            textColor="text-white"
        >
            <section className="landing">
                <div className="nav-card nav-card--left">
                    <NavCard
                        img="/waterfall.jpg"
                        imgAlt="Waterfall in Yosemite"
                        containerStyles={{
                            width: "100%",
                            height: "100%",
                            fontFamily: "Simsun",
                            fontSize: "1.45em"
                        }}
                    >
                        {/* <div
                            className="flex flex-col items-center rounded-lg shadow py-20 px-12"
                            style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
                        > */}
                        <Link href="/photos">
                            <a className="navcard__link pb-4">Photography ⟶</a>
                        </Link>
                        {/* </div> */}
                    </NavCard>
                </div>
                <style jsx>{`
                    .landing {
                        background-color: black;
                        scroll-snap-type: mandatory;
                        scroll-snap-points-y: repeat(100vh);
                        scroll-snap-type: y mandatory;
                        overflow: auto;
                        height: 100vh;
                    }
                    .nav-card {
                        scroll-snap-align: start;
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }
                `}</style>
            </section>
        </Layout>
    );
};

export default Home;
