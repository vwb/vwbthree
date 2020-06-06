import React, { useState, useEffect } from "react";

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

        document.getElementsByTagName("body")[0].style.backgroundColor =
            "#1B1B1B";

        return () => {
            document.getElementsByTagName("body")[0].style.backgroundColor =
                "initial";
        };
    }, []);

    const DARK_BACKGROUND = `-webkit-linear-gradient(bottom, rgba(26, 26, 26, 1), rgba(25, 25, 25, 0.0) 15%), url(/waterfall.jpg)`;

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
                className="fixed"
                style={{
                    marginTop: "-120px",
                    height,
                    width,
                    background: DARK_BACKGROUND,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: `blur(${blur}px)`
                }}
            >
                {props.children}
            </section>
        </section>
    );
};

export default LandingBackground;
