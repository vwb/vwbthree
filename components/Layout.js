import React from "react";
import Head from "next/head";
import Nav from "./nav";

const Layout = props => {
    const { children, navClass, textColor } = props;

    return (
        <>
            <Nav navClas={navClass} textColor={textColor} />
            {children}
            <style jsx>{`
                :global(body) {
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                        Avenir, Helvetica, sans-serif;
                }
            `}</style>
        </>
    );
};

export default Layout;
