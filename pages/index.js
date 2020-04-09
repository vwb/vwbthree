import React from "react";
import NavCard from "../components/navCard";
import Layout from "../components/layout";

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
                        linkHref="/photos"
                        linkText="Photography"
                        img="./waterfall.jpg"
                        imgAlt="Waterfall in Yosemite"
                        containerStyles={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </div>
                <div className="nav-card nav-card--right">
                    <NavCard
                        linkHref="/blog"
                        linkText="Developer"
                        img="./code.png"
                        imgAlt="Code"
                        containerStyles={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
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
