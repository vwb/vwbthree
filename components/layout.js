import React from "react";
import Head from "next/head";
import Nav from "./nav";
import SideNav from "./SideNav";
import { Provider as NavProvider } from "../context/navContext";

const Layout = props => {
    const { children, isOpenDefault, navClass, textColor } = props;
    const mainClasses = `pb-6 ${isOpenDefault ? "md:ml-64" : ""}`;

    return (
        <>
            <Head>
                <title>Vincent Budrovich</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <NavProvider>
                <SideNav isOpenDefault={isOpenDefault} />
                <Nav backgroundColor={navClass} textColor={textColor} />
                <div className={mainClasses}>{children}</div>
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
