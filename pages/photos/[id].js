import React from "react";
import { PHOTOS_JSON, PHOTO_GROUPS } from "../../data/photos";
import Layout from "../../components/layout";
import Link from "next/link";

const PhotoPage = props => {
    return (
        <Layout
            isOpenDefault={false}
            navClass="bg-transparent"
            textColor="text-white"
        >
            <section className="max-w-md mx-auto">
                {props.photos.map(({ url, title }) => (
                    <img
                        key={url}
                        className="pb-4 w-full"
                        src={url}
                        title={title}
                    />
                ))}
            </section>
        </Layout>
    );
};

PhotoPage.getInitialProps = async context => {
    const { query } = context;
    const { ids: photoIds } = PHOTO_GROUPS[query.id];
    const photos = photoIds.map(id => PHOTOS_JSON[id]);

    return { photos };
};

export default PhotoPage;
