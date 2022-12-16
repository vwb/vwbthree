import React, { useEffect } from "react";

export const useScrollListener = callback => {
    const listener = () => {
        window.requestAnimationFrame(callback);
    };

    useEffect(() => {
        window.addEventListener("scroll", listener);

        return () => window.removeEventListener("scroll", listener);
    }, []);
};
