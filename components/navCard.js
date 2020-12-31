import React, { useEffect, useState } from "react";

const NavCard = ({
    img,
    children,
    containerStyles,
    gradualBlur,
    blur = true
}) => {
    const [blurValue, setBlurValue] = useState(gradualBlur ? 0 : 10);
    useEffect(() => {
        setTimeout(() => {
            setBlurValue(10);
        }, 600);
    }, []);

    // const [bgColor, getBgColor] = useState(gradualBlur ? )/

    return (
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
                    filter: blur(${blur ? `${blurValue}px` : ""});
                    transition: all 2s ease-in;
                }
            `}</style>
        </div>
    );
};
export default NavCard;
