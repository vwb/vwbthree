import React, { useContext } from "react";
import { Context as NavContext } from "../context/navContext";
import Link from "next/link";

const Nav = ({ backgroundColor, textColor }) => {
    const testContextThing = useContext(NavContext);
    const { isNavOpen, setNavOpen } = testContextThing;

    const backgroundColorClass = backgroundColor ? backgroundColor : "bg-white";

    return (
        <nav
            className={`z-10 absolute top-0 right-0 left-0 text-center h-12 ${backgroundColorClass} ${textColor}`}
        >
            <ul className="flex justify-start">
                <li className="px-6 py-6 flex">
                    <Link href="/">
                        <a>vwbthree</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
