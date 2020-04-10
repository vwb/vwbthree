import React, { useContext } from "react";
import { Context as NavContext } from "../context/navContext";
import Link from "next/link";

const ProfileAvatar = () => (
    <div className="flex flex-col items-center py-4 pw-2 border-gray-100">
        <img
            className="w-20 h-20 rounded-full center"
            src="/profile_pic.jpg"
            alt="Profile Photo"
        />
        <h1 className="text-lg pt-2 font-thin">Vincent Budrovich</h1>
        <p className="font-hairline text-center text-xs text-gray-700 px-6 pt-2">
            Software engineer and photographer. A LA transplant based in San
            Francisco, CA
        </p>
    </div>
);

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
            className={`pt-16 transition-all duration-100 fixed inset-y-0 left-0 bg-white shadow ${width} overflow-hidden`}
        >
            <div className="flex flex-col p-3">
                <div
                    className={`${closeButtonVisible} absolute top-0 right-0 p-4`}
                >
                    <button onClick={() => setNavOpen(false)}>Close</button>
                </div>
                <ProfileAvatar />
            </div>
        </div>
    );
};

export default SideNav;
