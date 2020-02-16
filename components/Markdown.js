import React from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({ content }) => {
    return (
        <>
            <main className="post">
                <ReactMarkdown className="markdown-body" source={content} />
            </main>
            <style jsx>{`
                .post {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 12px 24px;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

export default Markdown;
