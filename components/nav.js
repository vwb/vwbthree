import React, { useContext } from "react";
import { Context as NavContext } from "../context/navContext";
import Link from "next/link";

const Nav = ({ backgroundColor, textColor, style }) => {
    const testContextThing = useContext(NavContext);
    const { isNavOpen, setNavOpen } = testContextThing;

    const backgroundColorClass = backgroundColor
        ? backgroundColor
        : "bg-white shadow";

    return (
        <nav
            className={`z-10 fixed top-0 right-0 left-0 text-center h-12 ${backgroundColorClass} ${textColor}`}
        >
            <ul className="flex justify-start">
                <li
                    className="px-5 py-3 flex"
                    style={{ fontFamily: "Gill Sans", fontWeight: "lighter" }}
                >
                    <Link href="/">
                        <a>vwbthree</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
