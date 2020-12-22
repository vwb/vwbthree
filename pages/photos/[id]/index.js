import React from "react";
import Link from "next/link";

import Layout from "../../../components/Layout";
import PhotoView from "../../../components/Photo";

import { generatePhotoSlug } from "../../../lib/photos";

import {
    getAllCollectionPaths,
    getCollectionData,
    getCollection
} from "../../../lib/collections";

const ScrollToNext = ({ onClick }) => (
    <div
        className="absolute w-full text-center text-gray-900 z-20"
        style={{ bottom: "5%" }}
    >
        <button className="focus:outline-none" onClick={onClick}>
            ↓
        </button>
    </div>
);

const PhotoContainer = ({ photo, isLast, index, collection }) => {
    return (
        <div
            id={`photo-view-${index}`}
            className="h-screen w-full relative flex items-center content-center overflow-hidden"
        >
            <PhotoView
                photo={photo}
                isRaised={true}
                render={image => (
                    <Link
                        href="/photos/[id]/[slug]"
                        as={`/photos/${collection.slug}/${generatePhotoSlug(
                            photo
                        )}`}
                    >
                        <a>{image}</a>
                    </Link>
                )}
            />
            {!isLast && (
                <ScrollToNext
                    onClick={() =>
                        document
                            .getElementById(`photo-view-${index + 1}`)
                            .scrollIntoView({ behavior: "smooth" })
                    }
                />
            )}
        </div>
    );
};

const PhotoGroupPage = props => (
    <Layout
        isOpenDefault={false}
        navClass="bg-transparent text-black"
        title={props.collection.name}
    >
        {props.photos.map((photo, index) => (
            <PhotoContainer
                key={photo.url}
                photo={photo}
                isLast={index === props.photos.length - 1}
                index={index}
                collection={props.collection}
            />
        ))}
    </Layout>
);

export async function getStaticPaths() {
    const paths = getAllCollectionPaths();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const photos = getCollectionData(params.id);
    const collection = getCollection(params.id);
    return { props: { photos, collection } };
}

export default PhotoGroupPage;
