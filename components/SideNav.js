import React, { useContext } from "react";
import { Context as NavContext } from "../context/navContext";
import Link from "next/link";

const ProfileAvatar = () => (
    <h1 className="text-xl font-medium">Vincent Budrovich</h1>
);

const Links = () => {
    const testContextThing = useContext(NavContext);
    const { setNavOpen } = testContextThing;

    return (
        <>
            <Link href="/blog">
                <a onClick={() => setNavOpen(false)}>Developer</a>
            </Link>
            <Link href="/photos">
                <a onClick={() => setNavOpen(false)}>Photography</a>
            </Link>
        </>
    );
};

const SideNav = ({ isOpenDefault }) => {
    const testContextThing = useContext(NavContext);
    const { isNavOpen, setNavOpen } = testContextThing;

    const openDefault = isOpenDefault ? "w-0 md:w-64" : "w-0";
    const width = isNavOpen ? "w-4/5 md:w-64" : openDefault;
    const closeButtonVisible = isOpenDefault ? "md:hidden" : "";
    /*
    Need:
        • link hierarchy
            • photos
                • tbd
            • developer
                • blog
                • (not yet) projects
                • (not yet) featured
        • avatar of some kind (profile photo)
        • potentially could push content rather than sit on top of
    */

    return (
        <div
            className={`transition-all duration-100 fixed inset-y-0 left-0 bg-gray-200 ${width} overflow-hidden`}
        >
            <div className="flex flex-col p-3">
                <div
                    className={`${closeButtonVisible} absolute top-0 right-0 p-4`}
                >
                    <button onClick={() => setNavOpen(false)}>Close</button>
                </div>
                <ProfileAvatar />
                <Links />
            </div>
        </div>
    );
};

export default SideNav;
