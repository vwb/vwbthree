import React from "react";
import Link from "next/link";

const NavCard = ({ img, linkHref, linkText, containerStyles }) => {
    return (
        <div className="navcard" style={containerStyles}>
            <Link href={linkHref}>
                <a className="navcard__link">{linkText}</a>
            </Link>
            <div className="navcard__img__container" />
            <style jsx>{`
                .navcard__link {
                    position: absolute;
                    z-index: 1;
                    left: 50%;
                    top: 50%;
                    transform: translate(-33%, -50%);
                    padding: 20px 28px;
                    background-color: rgba(49, 49, 49, 0.67);
                    border-color: #868585;
                    border-width: 1px;
                    border-style: solid;
                    color: white;
                }
                .navcard__img__container {
                    background-image: url(${img});
                    background-size: cover;
                    background-position: center;
                    filter: blur(4px);
                    -webkit-filter: blur(3px);
                    height: 110%;
                    width: 110%;
                }
            `}</style>
        </div>
    );
};

export default NavCard;
