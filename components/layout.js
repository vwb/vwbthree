import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

const layoutStyle = `
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
            Avenir, Helvetica, sans-serif;
    },
`;

const Layout = ({ children }) => {
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
            <Nav />
            {children}
            <style jsx>{layoutStyle}</style>
            <style jsx global>{`
                ul,
                div,
                body,
                p {
                    margin: 0;
                    padding: 0;
                    style: none;
                }
                a {
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
};

export default Layout;
