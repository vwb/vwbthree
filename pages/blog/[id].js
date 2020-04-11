import matter from "gray-matter";
import Markdown from "../../components/Markdown";
import Layout from "../../components/layout";

const Post = props => (
    <Layout isOpenDefault={true}>
        <main className="pt-12">
            <Markdown content={props.post.content} />
        </main>
    </Layout>
);

Post.getInitialProps = async context => {
    const { query } = context;

    const postRaw = await import(`../../data/posts/${query.id}.md`);

    const post = matter(postRaw.default);

    return { post };
};

export default Post;
