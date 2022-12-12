import React from "react";

import "../css/tailwind.css";
import "../css/markdown.css";
import "../scss/animations.scss";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ height: "100vh" }}>{children}</body>
        </html>
    );
}
