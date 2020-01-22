import React from "react";
import Link from "next/link";

const links = [
    { href: "https://zeit.co/now", label: "ZEIT" },
    { href: "https://github.com/vwb", label: "GitHub" },
    {}
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`;
    return link;
});

const Nav = () => (
    <nav>
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            {links.map(({ key, href, label }) => (
                <li key={key}>
                    <a href={href}>{label}</a>
                </li>
            ))}
        </ul>
        <style jsx>{`
            :global(body) {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Avenir Next,
                    Avenir, Helvetica, sans-serif;
            }
            nav {
                text-align: center;
                background-color: black;
            }
            ul {
                display: flex;
                justify-content: space-between;
            }
            nav > ul {
                padding: 8px 12px;
            }
            li {
                display: flex;
                padding: 6px 8px;
            }
            a {
                color: white;
                text-decoration: none;
                font-size: 13px;
            }
        `}</style>
    </nav>
);

export default Nav;
