import Card from "./Card";
import Link from "next/link";

const PostCard = props => {
    return (
        <div className="m-4">
            <Card>
                <div className="p-4">
                    <Link href="/blog/[id]" as={`/blog/${props.slug}`}>
                        <a>{props.title}</a>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default PostCard;
