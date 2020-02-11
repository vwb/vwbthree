import matter from "gray-matter";
import Markdown from "../../components/Markdown";

const Post = props => {
    return <Markdown content={props.post.content} />;
};

Post.getInitialProps = async context => {
    const { query } = context;

    const postRaw = await import(`../../data/posts/${query.id}.md`);

    const post = matter(postRaw.default);

    return { post };
};

export default Post;
