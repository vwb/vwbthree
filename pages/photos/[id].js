import React, { useEffect } from "react";
import { PHOTOS_JSON, PHOTO_GROUPS } from "../../data/photos";
import Layout from "../../components/layout";

const PhotoCard = ({ url, title, isLast, index }) => {
    const backgroundStyles = {
        backgroundColor: "black",
        background: `-webkit-linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        filter: "blur(15px)"
    };

    return (
        <div
            id={`photo-card-${index}`}
            className="h-screen w-full relative flex items-center content-center overflow-hidden"
            style={{
                scrollSnapAlign: "start"
            }}
        >
            <div className="z-10 absolute w-full">
                <img
                    key={url}
                    className="h-full max-w-md mx-auto"
                    style={{
                        boxShadow: "1px 1px 20px rgba(0,0,0,0.5)",
                        width: "80%",
                        marginTop: "-30px"
                    }}
                    src={url}
                    title={title}
                />
            </div>
            <div style={backgroundStyles} />
            {!isLast && (
                <div
                    className="absolute w-full text-center text-gray-700 z-20"
                    style={{ bottom: "5%" }}
                >
                    <button
                        className="focus:outline-none"
                        onClick={() =>
                            document
                                .getElementById(`photo-card-${index + 1}`)
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        ↓
                    </button>
                </div>
            )}
        </div>
    );
};

const PhotoGroupPage = props => {
    const style = {
        scrollSnapType: "y mandatory"
    };

    useEffect(() => {
        window.scrollTo(0, 1);
    });

    return (
        <Layout
            isOpenDefault={false}
            navClass="bg-transparent"
            textColor="text-gray-800"
        >
            <section style={style}>
                {props.photos.map(({ url, title }, index) => (
                    <PhotoCard
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
    const { ids: photoIds } = PHOTO_GROUPS[query.id];
    const photos = photoIds.map(id => PHOTOS_JSON[id]);

    return { photos };
};

export default PhotoGroupPage;
