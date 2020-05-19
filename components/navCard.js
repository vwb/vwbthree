import React from "react";
import Link from "next/link";

import Blur from './Blur';

const NavCard = ({ img, linkHref, linkText, containerStyles, blur = true }) => (
    <div className="navcard" style={containerStyles}>
        {blur && <Blur />}
        <div className="link-container">
            {linkHref ? (
                <Link href={linkHref}>
                    <a className="navcard__link">{linkText}</a>
                </Link>
            ) : (
                linkText
            )}
        </div>
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
            }
        `}</style>
    </div>
);

export default NavCard;
