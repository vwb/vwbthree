import React from "react";
import NavCard from "../components/navCard";

const Home = () => {
    return (
        <main className="landing">
            <div className="nav-card nav-card--left">
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
            <div className="nav-card nav-card--right">
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
            <style jsx>{`
                main {
                    display flex;
                }
                .landing {
                    display: flex;
                }
                .nav-card {
                    position: fixed;
                }
                @media screen and (max-width: 400px) {
                    .nav-card--left {   
                        height: 50%;
                        width: 100%;
                        position: fixed;
                        top: 0;
                        left: -15px;
                        right: -15px;
                        bottom: 0;
                    }
                    .nav-card--right {
                        width: 100%;
                        height: 50%;
                        position: fixed;
                        left: -15px;
                        bottom: 0;
                        right: -15px;
                    }
                }
                @media screen and (min-width: 400px) {
                    .nav-card--left {
                        width: 50%;
                        position: fixed;
                        top: 0;
                        left: -15px;
                        bottom: 0;
                    }
                    .nav-card--right {
                        width: 50%;
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </main>
    );
};

export default Home;
