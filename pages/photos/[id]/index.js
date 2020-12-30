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

const storeIndex = (index, collectionName) => {
    localStorage.setItem(
        "vwb_photos_index",
        JSON.stringify({ collectionName, index })
    );
};

const PhotoContainer = ({
    photo,
    index,
    collection,
    isLast,
    handleNextPhotoClick
}) => {
    return (
        <div className="h-full w-full relative flex items-center content-center overflow-hidden">
            <PhotoView
                photo={photo}
                isRaised={true}
                style={{
                    height: "60%"
                }}
                render={image => (
                    <Link
                        href="/photos/[id]/[slug]"
                        as={`/photos/${collection.slug}/${generatePhotoSlug(
                            photo
                        )}`}
                    >
                        <a onClick={() => storeIndex(index, collection.name)}>
                            {image}
                        </a>
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
    const [windowInnerHeight, setInnerHeight] = React.useState(null);
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const ref = React.useRef();

    const setRef = element => {
        ref.current = element;
    };

    React.useLayoutEffect(() => {
        setInnerHeight(document.documentElement.clientHeight);
    }, []);

    React.useEffect(() => {
        if (windowInnerHeight && ref.current && !hasScrolled) {
            const potentialIndex = JSON.parse(
                localStorage.getItem("vwb_photos_index")
            );

            if (potentialIndex) {
                if (potentialIndex?.collectionName === props.collection.name) {
                    ref?.current?.scrollToItem(potentialIndex.index, "start");
                }

                if (ref.current) {
                    localStorage.removeItem("vwb_photos_index");
                }

                setHasScrolled(true);
            }
        }
    });

    return (
        <Layout
            isOpenDefault={false}
            navClass="bg-transparent text-black"
            title={props.collection.name}
        >
            <div
                className={`w-screen ${windowInnerHeight ? "" : "h-screen"}`}
                style={{ height: windowInnerHeight ? windowInnerHeight : "" }}
            >
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className="photo-list"
                            ref={element => setRef(element)}
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
