import React from "react";
import matter from "gray-matter";
import PostCard from "../../components/PostCard";
import Layout from "../../components/layout";

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
        <Layout isOpenDefault={true}>
            <div className="w-full sm:w-2/3 lg:w-1/2 m-auto">
                <section className="text-center">
                    <h2 className="pl-2 text-2xl">Blog Posts</h2>
                </section>
                <main className="align-middle">
                    {posts.map(post => (
                        <PostCard
                            key={post.slug}
                            title={post.document.data.title}
                            date={post.document.data.date}
                            slug={post.slug}
                        />
                    ))}
                </main>
            </div>
        </Layout>
    );
};

BlogIndex.getInitialProps = async context => {
    const posts = getPostData();

    return { posts };
};

export default BlogIndex;
