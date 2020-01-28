import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const Post = props => {
    return <ReactMarkdown source={props.post.content} />;
};

Post.getInitialProps = async context => {
    const { query } = context;

    const postRaw = await import(`../../data/posts/${query.id}.md`);

    const post = matter(postRaw.default);

    return { post };
};

export default Post;
