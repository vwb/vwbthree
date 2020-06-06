import React from "react";
import Head from "next/head";
import Nav from "./nav";
import { Provider as NavProvider } from "../context/navContext";

const Layout = props => {
    const { children, navClass, textColor } = props;

    return (
        <>
            <Head>
                <title>
                    {props.title
                        ? `${props.title} | Vincent Budrovich`
                        : "Vincent Budrovich"}
                </title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <NavProvider>
                <Nav navClas={navClass} textColor={textColor} />
                {children}
                <style jsx>{`
                    :global(body) {
                        margin: 0;
                        font-family: -apple-system, BlinkMacSystemFont,
                            Avenir Next, Avenir, Helvetica, sans-serif;
                    }
                `}</style>
            </NavProvider>
        </>
    );
};

export default Layout;
