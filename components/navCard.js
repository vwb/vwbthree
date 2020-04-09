import React from "react";
import Link from "next/link";

const NavCard = ({ img, linkHref, linkText, containerStyles }) => {
    return (
        <div className="navcard" style={containerStyles}>
            <div className="link-container">
                <Link href={linkHref}>
                    <a className="navcard__link">{linkText}</a>
                </Link>
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
                }
                .navcard__link {
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
                    height: 100%;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default NavCard;
