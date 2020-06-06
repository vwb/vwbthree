import { useEffect } from "react";

export const useScrollListener = callback => {
    const listener = () => {
        callback();
    };

    useEffect(() => {
        window.addEventListener("scroll", listener);

        return () => window.removeEventListener("scroll", listener);
    }, []);
};
