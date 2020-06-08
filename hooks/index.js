import { useEffect } from "react";
import { throttle } from "throttle-debounce";

export const useScrollListener = (callback, delay = 100) => {
    const listener = () => {
        callback();
    };

    useEffect(() => {
        const throttledCallback = throttle(delay, listener);
        window.addEventListener("scroll", throttledCallback);

        return () => window.removeEventListener("scroll", throttledCallback);
    }, []);
};
