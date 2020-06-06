import React, { useState, useEffect } from "react";

const FadeIn = ({ children, transitionTime = 2 }) => {
    const [fadeVal, setFadeVal] = useState(0);
    useEffect(() => {
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
