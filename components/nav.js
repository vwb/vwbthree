import React, { useContext } from "react";
import { Context as NavContext } from "../context/navContext";
import Link from "next/link";

const Nav = () => {
    const testContextThing = useContext(NavContext);
    const { isNavOpen, setNavOpen } = testContextThing;

    return (
        <nav className="text-center bg-white border-b border-gray-500">
            <ul className="flex justify-start">
                <li className="px-4 py-3 flex">
                    <button onClick={() => setNavOpen(!isNavOpen)}>
                        vwbthree
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
