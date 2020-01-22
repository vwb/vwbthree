import React from "react";
import matter from "gray-matter";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";

const Home = ({ posts }) => {
    return (
        <div>
            <Head>
                <title>Vincent Budrovich</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div>
                <ul>
                    {posts.map(post => (
                        <li key={post.slug}>
                            <Link href="/p/[id]" as={`/p/${post.slug}`}>
                                <a>{post.document.data.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                .hero {
                    width: 100%;
                    color: #333;
                }
                .title {
                    margin: 0;
                    width: 100%;
                    padding-top: 80px;
                    line-height: 1.15;
                    font-size: 48px;
                }
                .title,
                .description {
                    text-align: center;
                }
                .row {
                    max-width: 880px;
                    margin: 80px auto 40px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }
                .card {
                    padding: 18px 18px 24px;
                    width: 220px;
                    text-align: left;
                    text-decoration: none;
                    color: #434343;
                    border: 1px solid #9b9b9b;
                }
                .card:hover {
                    border-color: #067df7;
                }
                .card h3 {
                    margin: 0;
                    color: #067df7;
                    font-size: 18px;
                }
                .card p {
                    margin: 0;
                    padding: 12px 0 0;
                    font-size: 13px;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

const getPostData = () =>
    (context => {
        // grab all the files matching this context
        const keys = context.keys();
        // grab the values from these files
        const values = keys.map(context);
        // go through each file
        const data = keys.map((key, index) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\\/]/, "")
                .split(".")
                .slice(0, -1)
                .join(".");
            // get the current file value
            const value = values[index];
            // Parse frontmatter & markdownbody for the current file
            const document = matter(value.default);
            // return the .md content & pretty slug
            return {
                document,
                slug
            };
        });
        // return all the posts
        return data;
    })(require.context("../data/posts", true, /\.md$/));

Home.getInitialProps = async context => {
    const posts = getPostData();

    return { posts };
};

export default Home;
