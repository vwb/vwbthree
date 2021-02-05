import React from "react";
import { useRouter } from "next/router";
import BreadCrumbs from "./BreadCrumbs";
import { InstagramLink } from "./Instagram";

const Nav = ({ navClas, textColor }) => {
    const router = useRouter();

    const path = router.asPath.split("/");
    const cleanedPath = path.filter(crumb => crumb);

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
            <div className="p-3">
                <InstagramLink />
            </div>
        </nav>
    );
};

export default Nav;
