import React from "react";
import Link from "next/link";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import Layout from "../../Layout";
import PhotoView from "../../Photo";

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
                        href="/photos/[id]/"
                        as={`/photos/${photo.displayName}--${photo.photoName}`}
                    >
                        <a onClick={() => storeIndex(index, collection)}>
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

    React.useEffect(() => {
        setInnerHeight(document.documentElement.clientHeight);
    }, []);

    React.useEffect(() => {
        if (windowInnerHeight && ref.current && !hasScrolled) {
            const potentialIndex = JSON.parse(
                localStorage.getItem("vwb_photos_index")
            );

            if (potentialIndex) {
                if (potentialIndex?.collectionName === props.collection) {
                    ref?.current?.scrollTo(
                        windowInnerHeight * potentialIndex.index
                    );
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
            navClass="bg-white shadow"
            title={props.collection}
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
                                    <div
                                        style={{
                                            ...style,
                                            left: "0px",
                                            right: "0px",
                                            width: "90%",
                                            margin: "0 auto"
                                        }}
                                    >
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

export default PhotoGroupPage;
