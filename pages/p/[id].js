import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const Post = props => {
    return (
        <div>
            <Link href="/">
                <a>Home</a>
            </Link>
            <div>
                <ReactMarkdown source={props.post.content} />
            </div>
        </div>
    );
};

Post.getInitialProps = async context => {
    const { query } = context;

    const postRaw = await import(`../../data/posts/${query.id}.md`);

    const post = matter(postRaw.default);

    return { post };
};

export default Post;
