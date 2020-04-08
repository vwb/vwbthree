import React from "react";
import { PHOTOS_JSON } from "../../data/images";
import Layout from "../../components/layout";
import Link from "next/link";

const PhotoPage = props => {
    return (
        <Layout>
            {/* Link back to photos here */}
            <section className="max-w-md mx-auto">
                <Link href="/photos">
                    <a>{"< Photos"}</a>
                </Link>
                <img
                    className="pt-4 w-full"
                    src={props.photo.url}
                    title={props.photo.title}
                />
            </section>
        </Layout>
    );
};

PhotoPage.getInitialProps = async context => {
    const { query } = context;
    const photo = PHOTOS_JSON[query.id];
    return { photo };
};

export default PhotoPage;
