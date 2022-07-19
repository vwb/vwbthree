import React from "react";

const STYLE_MAP = {
    light: {
        textHover: "text-gray-100",
        borderColor: "border-gray-200",
        borderColorHover: "border-gray-100"
    },
    dark: {
        textHover: "text-gray-900",
        borderColor: "border-gray-800",
        borderColorHover: "border-gray-900"
    }
};

export const LinkButton = React.forwardRef(
    ({ onClick, href, children, style }, ref) => {
        const styleMap = STYLE_MAP[style] || STYLE_MAP.light;

        return (
            <a
                href={href}
                onClick={onClick}
                ref={ref}
                className={`relative text-xl my-5 rounded-sm cursor-pointer focus:shadow-lg hover:shadow-sm hover:${styleMap.textHover} hover:${styleMap.borderColorHover}`}
            >
                <>
                    <div
                        className={`top-right absolute border-solid ${styleMap.borderColor} hover:shadow-sm hover:${styleMap.textHover} hover:${styleMap.borderColorHover}`}
                        style={{ top: 0, right: 0 }}
                    />
                    <div
                        className={`bottom-right absolute border-solid ${styleMap.borderColor} hover:shadow-sm hover:${styleMap.textHover} hover:${styleMap.borderColorHover}`}
                        style={{ right: 0, bottom: 0 }}
                    />
                    <div
                        className={`bottom-left absolute border-solid ${styleMap.borderColor} hover:shadow-sm hover:${styleMap.textHover} hover:${styleMap.borderColorHover}`}
                        style={{ bottom: 0 }}
                    />
                    <div
                        className={`top-left absolute border-solid ${styleMap.borderColor} hover:shadow-sm hover:${styleMap.textHover} hover:${styleMap.borderColorHover}`}
                        style={{ left: 0 }}
                    />
                    <div className="fade-in px-5 py-3">{children}</div>
                </>
            </a>
        );
    }
);

export default LinkButton;
