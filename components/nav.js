import React from "react";
import { useRouter } from "next/router";
import BreadCrumbs from "./BreadCrumbs";

const Nav = ({ backgroundColor, textColor }) => {
    const router = useRouter();

    const path = router.asPath.split("/");
    const cleanedPath = path.filter(crumb => crumb);

    let constructedRoute = "/";

    const formattedCleanedPath = [
        { route: "/", display: "vwbthree" },
        ...cleanedPath.map(path => ({
            route: (constructedRoute += `${path}/`),
            display: path.replace(/-/g, " ")
        }))
    ];

    const backgroundColorClass = backgroundColor
        ? backgroundColor
        : "bg-white shadow";

    return (
        <nav
            className={`z-50 fixed top-0 right-0 left-0 text-center h-12 ${backgroundColorClass} ${textColor}`}
        >
            <BreadCrumbs crumbs={formattedCleanedPath} />
        </nav>
    );
};

export default Nav;
