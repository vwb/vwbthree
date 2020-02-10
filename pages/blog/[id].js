import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const Post = props => {
    return (
        <div>
            <section className="post">
                <ReactMarkdown source={props.post.content} />
            </section>
            <style jsx>{`
                .post {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 12px 24px;
                }
            `}</style>
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
