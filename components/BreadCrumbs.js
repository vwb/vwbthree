import React from "react";
import Link from "next/link";

const Divider = ({ currentIndex, crumbLength, children }) =>
    currentIndex < crumbLength - 1 ? children : null;

export const BreadCrumbs = props => (
    <ul
        className="flex justify-start pl-5"
        style={{ overflowX: "scroll", flexGrow: "1" }}
    >
        {props.crumbs.map((crumb, index) => (
            <li
                key={crumb.route}
                className="py-3"
                style={{
                    fontFamily: "Gill Sans",
                    fontWeight: "lighter",
                    display: "flex",
                    flex: "0 0 auto"
                }}
            >
                <Link href={crumb.route}>
                    {crumb.display}
                    <Divider
                        currentIndex={index}
                        crumbLength={props.crumbs.length}
                    >
                        <span className="px-1">/</span>
                    </Divider>
                </Link>
            </li>
        ))}
    </ul>
);

export default BreadCrumbs;
