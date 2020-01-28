import React from "react";
import matter from "gray-matter";
import Link from "next/link";

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
    })(require.context("../../data/posts", true, /\.md$/));

const BlogIndex = ({ posts }) => {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.slug}>
                    <Link href="/blog/[id]" as={`/blog/${post.slug}`}>
                        <a>{post.document.data.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

BlogIndex.getInitialProps = async context => {
    const posts = getPostData();

    return { posts };
};

export default BlogIndex;
