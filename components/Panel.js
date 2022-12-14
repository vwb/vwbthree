"use client";
import React, { useState } from "react";

export const PanelContext = React.createContext(false);

const Panel = props => {
    const [isOpen, setOpen] = useState(false);
    const CLOSED_DETAIL_PANEL_STYLES = {
        height: "64px",
        bottom: "0",
        left: "0",
        right: "0",
        transition: "height 0.4s"
    };

    const OPEN_DETAIL_PANEL_STYLES = {
        ...CLOSED_DETAIL_PANEL_STYLES,
        height: "75vh"
    };

    return (
        <div
            className="z-20 fixed bg-opacity-0"
            style={
                isOpen ? OPEN_DETAIL_PANEL_STYLES : CLOSED_DETAIL_PANEL_STYLES
            }
        >
            <div
                style={{
                    backgroundColor: `rgba(255,255,255, ${isOpen ? 1 : 0.6})`,
                    transition: "background-color 0.4s"
                }}
                className="w-full sm:w-3/4 lg:w-1/2 xl:x-1/3 mx-auto h-full rounded-lg rounded-b-none shadow-xl text-black "
            >
                <PanelContext.Provider value={[isOpen, setOpen]}>
                    {props.children}
                </PanelContext.Provider>
            </div>
        </div>
    );
};

export default Panel;
