import React from "react";
import NavCard from "../components/navCard";

const styleMap = {
    mobile: {
        left: {
            width: "50%",
            position: "fixed",
            top: "0",
            left: "-15px",
            bottom: "0"
        },
        right: {
            width: "50%",
            position: "fixed",
            top: "0",
            bottom: "0",
            transform: "translateX(100%)"
        }
    }
};

const Home = () => {
    // if (typeof window !== undefined) {
    //     let styles = {};
    //     const isMobile = window.matchMedia("(min-width: 480px)");

    //     if (isMobile.matches) {
    //         styles = styleMap["mobile"];
    //     } else {
    //         styles = styleMap["desktop"];
    //     }
    // }

    return (
        <main className="landing">
            <NavCard
                linkHref="/blog"
                linkText="Developer"
                img="./code.png"
                imgAlt="Code"
                containerStyles={{
                    width: "50%",
                    position: "fixed",
                    top: "0",
                    left: "-15px",
                    bottom: "0"
                }}
            />
            <NavCard
                linkHref="/photos"
                linkText="Photography"
                img="./waterfall.jpg"
                imgAlt="Waterfall in Yosemite"
                containerStyles={{
                    width: "50%",
                    position: "fixed",
                    top: "0",
                    bottom: "0",
                    transform: "translateX(100%)"
                }}
            />
            <style jsx>{`
                main {
                    display flex;
                }
                .landing {
                    display: flex;
                }
            `}</style>
        </main>
    );
};

export default Home;
