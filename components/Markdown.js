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
            <style jsx global>{`
                pre {
                    overflow: auto;
                    background-color: #f6f8fa;
                    border-radius: 3px;
                    font-size: 85%;
                    line-height: 1.45;
                    overflow: auto !important;
                    padding: 16px;
                }
                pre code {
                    background-color: transparent;
                    border: 0;
                    display: inline;
                    line-height: inherit;
                    margin: 0;
                    max-width: auto;
                    overflow: visible;
                    padding: 0;
                    word-wrap: normal;
                }
                pre > code {
                    background: transparent;
                    border: 0;
                    font-size: 100%;
                    margin: 0;
                    padding: 0;
                    white-space: pre;
                    word-break: normal;
                }
                ul {
                    list-style: inside;
                }
            `}</style>
        </>
    );
};

export default Markdown;
