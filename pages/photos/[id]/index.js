import React from "react";
import Link from "next/link";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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

const PhotoContainer = ({
    photo,
    index,
    collection,
    isLast,
    handleNextPhotoClick
}) => {
    return (
        <div className="h-screen w-full relative flex items-center content-center overflow-hidden">
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
                <ScrollToNext onClick={() => handleNextPhotoClick(index)} />
            )}
        </div>
    );
};

const PhotoGroupPage = props => {
    const ref = React.useRef();

    return (
        <Layout
            isOpenDefault={false}
            navClass="bg-transparent text-black"
            title={props.collection.name}
        >
            <div className="h-screen w-screen">
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="photo-list"
                            ref={ref}
                            height={height}
                            itemCount={props.photos.length}
                            itemData={props.photos}
                            itemSize={height}
                            width={width}
                        >
                            {({ index, style }) => {
                                return (
                                    <div style={style}>
                                        <PhotoContainer
                                            collection={props.collection}
                                            photo={props.photos[index]}
                                            index={index}
                                            isLast={
                                                index ===
                                                props.photos.length - 1
                                            }
                                            handleNextPhotoClick={currentIndex => {
                                                ref.current.scrollToItem(
                                                    currentIndex + 1
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            }}
                        </List>
                    )}
                </AutoSizer>
            </div>
        </Layout>
    );
};

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
