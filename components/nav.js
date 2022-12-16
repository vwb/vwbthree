"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BreadCrumbs from "./BreadCrumbs";
import { InstagramLink } from "./Instagram";
import { CheckoutLink } from "./CheckoutLink";

const Nav = ({ navClas, textColor }) => {
    const pathname = usePathname();
    const cleanedPath = pathname.split("/").filter(crumb => crumb);

    let constructedRoute = "";

    const formattedCleanedPath = [
        { route: "/", display: "vwbthree" },
        ...cleanedPath.map(path => ({
            route: (constructedRoute += `/${path}`),
            display: path.split("--")[0].replace(/-/g, " ")
        }))
    ];

    return (
        <nav
            className={`${navClas} z-50 fixed top-0 right-0 left-0 text-center h-12 flex justify-between ${textColor}`}
        >
            <BreadCrumbs crumbs={formattedCleanedPath} />
            {pathname.includes("photos") ? (
                <div className="p-3">
                    <CheckoutLink href="/photos/cart" />
                </div>
            ) : null}
            <div className="p-3">
                <InstagramLink />
            </div>
        </nav>
    );
};

export default Nav;
