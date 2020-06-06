import React from "react";
import App from "next/app";
import Router from "next/router";

import "../css/tailwind.css";
import "../css/markdown.css";
import "../scss/animations.scss";

class MyApp extends App {
    componentDidMount() {
        const cachedPageHeight = [];
        const html = document.querySelector("html");

        Router.events.on("routeChangeStart", () => {
            cachedPageHeight.push(document.documentElement.offsetHeight);
        });

        Router.events.on("routeChangeComplete", () => {
            html.style.height = "initial";
        });

        Router.beforePopState(() => {
            html.style.height = `${cachedPageHeight.pop()}px`;

            return true;
        });
    }

    render() {
        const { Component, pageProps } = this.props;

        return <Component {...pageProps} />;
    }
}

export default MyApp;
