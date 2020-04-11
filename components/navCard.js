import React from "react";
import Link from "next/link";

const NavCard = ({ img, linkHref, linkText, containerStyles, blur = true }) => {
    const imageContainerClasses = `navcard__img__container ${
        blur ? "navcard__img__container--blur" : ""
    }`;

    return (
        <div className="navcard" style={containerStyles}>
            <div className="link-container">
                {linkHref ? (
                    <Link href={linkHref}>
                        <a className="navcard__link">{linkText}</a>
                    </Link>
                ) : (
                    linkText
                )}
            </div>
            <div className={imageContainerClasses} />
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
                .navcard__img__container--blur {
                    filter: blur(4px);
                    -webkit-filter: blur(3px);
                }
            `}</style>
        </div>
    );
};

export default NavCard;
