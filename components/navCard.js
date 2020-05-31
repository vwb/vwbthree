import React from "react";

import Blur from "./Blur";

const NavCard = ({ img, children, containerStyles, blur = true }) => (
    <div className="navcard" style={containerStyles}>
        <div className="link-container">{children}</div>
        <div className="navcard__img__container" />
        <style jsx>{`
            .navcard {
                position: relative;
            }
            .link-container {
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                z-index: 1;
                color: #f7fafc;
            }
            .navcard__img__container {
                background-image: url(${img});
                background-size: cover;
                background-position: center;
                height: 100%;
                width: 100%;
                filter: blur(${blur ? "5px" : ""});
            }
        `}</style>
    </div>
);

export default NavCard;
