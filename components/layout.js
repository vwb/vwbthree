import React from "react";
import Head from "next/head";
import Nav from "./nav";
import SideNav from "./SideNav";
import { Provider as NavProvider } from "../context/navContext";

const Layout = props => {
    const { children, isOpenDefault } = props;

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
                <Nav />
                <div className="pt-4 pb-6">{children}</div>
            </NavProvider>
        </>
    );
};

export default Layout;
