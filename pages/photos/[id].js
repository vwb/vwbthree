import React from "react";
import Layout from "../../components/Layout";
import Blur from "../../components/Blur";

import PHOTO_COLLECTIONS from "../../data/photos/collections.json";
import PHOTOS_JSON from "../../data/photos/images.json";

const ScrollToNext = ({ index }) => (
    <div
        className="absolute w-full text-center text-gray-900 z-20"
        style={{ bottom: "5%" }}
    >
        <button
            className="focus:outline-none"
            onClick={() =>
                document
                    .getElementById(`photo-view-${index + 1}`)
                    .scrollIntoView({ behavior: "smooth" })
            }
        >
            ↓
        </button>
    </div>
);

const Image = ({ url, title, isRaised }) => (
    <img
        key={url}
        className="max-w-xl mx-auto w-4/5 sm:w-3/5 md:w-auto"
        style={isRaised ? { boxShadow: "1px 1px 20px rgba(0,0,0,0.5)" } : ""}
        src={url}
        title={title}
    />
);

const PhotoView = ({ url, title, isLast, index, isDarkBg = true }) => {
    const DARK_BACKGROUND = `-webkit-linear-gradient(rgba(85, 85, 85, 0.45), rgba(85, 85, 85, 0.45)), url(${url})`;

    const backgroundStyles = {
        background: DARK_BACKGROUND,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%"
    };

    return (
        <div
            id={`photo-view-${index}`}
            className="h-screen w-full relative flex items-center content-center overflow-hidden"
            style={{
                scrollSnapAlign: "start"
            }}
        >
            <Blur />
            <div className="z-10 absolute w-full">
                <Image url={url} title={title} isRaised={true} />
            </div>
            <div style={backgroundStyles} />
            {!isLast && <ScrollToNext index={index} />}
        </div>
    );
};

const PhotoGroupPage = props => {
    const style = {
        scrollSnapType: "y mandatory"
    };

    return (
        <Layout isOpenDefault={false} navClass="bg-transparent">
            <section style={style}>
                {props.photos.map(({ url, title }, index) => (
                    <PhotoView
                        key={url}
                        url={url}
                        title={title}
                        isLast={index === props.photos.length - 1}
                        index={index}
                    />
                ))}
            </section>
        </Layout>
    );
};

PhotoGroupPage.getInitialProps = async context => {
    const { query } = context;

    const { ids: photoIds } = PHOTO_COLLECTIONS[query.id];
    const photos = photoIds.map(id => PHOTOS_JSON[id]);

    return { photos };
};

export default PhotoGroupPage;
