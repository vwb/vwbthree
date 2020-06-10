import React, { useState, useEffect } from "react";

const LandingBackground = props => {
    const [{ width, height }, setDimensions] = useState({
        width: "100vw",
        height: "100vh"
    });

    useEffect(() => {
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
            className="fixed landing__background"
            style={{
                height,
                width,
                backgroundColor: "#1B1B1B",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
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
        </section>
    );
};

export default LandingBackground;
