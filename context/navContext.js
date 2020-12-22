import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(false);

    const navContext = { isNavOpen, setNavOpen };

    return <Context.Provider value={navContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
