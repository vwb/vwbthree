import React, { useState, useEffect } from "react";
import DownArrow from "./DownArrrow";

import { useScrollListener } from "../hooks";

const ScrollArrow = () => {
    const [opacity, setOpacity] = useState(1);
    const handleOpacityOnScroll = () => {
        if (window.scrollY === 0) {
            return setOpacity(1);
        }

        if (window.scrollY > 0 && opacity !== 0) {
            return setOpacity(0);
        }
    };

    useScrollListener(handleOpacityOnScroll);

    useEffect(() => {
        handleOpacityOnScroll();
    }, []);

    return (
        <button
            className="bounce focus:outline-none absolute flex w-full justify-center"
            style={{
                opacity,
                bottom: "75px",
                transition: "opacity 0.5s ease-in-out",
                animationDuration: "2s",
                animationIterationCount: "infinite"
            }}
            onClick={() =>
                window.scrollBy(
                    window.scrollBy({
                        top: window.outerHeight,
                        left: 0,
                        behavior: "smooth"
                    })
                )
            }
        >
            <DownArrow
                style={{
                    height: "50px",
                    fill: "white"
                }}
                className=""
            />
        </button>
    );
};

export default ScrollArrow;
