import React, { useState, useLayoutEffect } from "react";

const FadeIn = ({ children, transitionTime = 2 }) => {
    const [fadeVal, setFadeVal] = useState(0);
    useLayoutEffect(() => {
        setTimeout(() => {
            setFadeVal(0.9);
        }, 600);
    }, []);

    return (
        <div
            className="h-full w-full"
            style={{
                opacity: fadeVal,
                transition: `opacity ${transitionTime}s`
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;
