import React, { useEffect } from "react";
import { PHOTOS_JSON, PHOTO_GROUPS } from "../../data/photos";
import Layout from "../../components/layout";
import autoprefixer from "autoprefixer";

// .navcard__img__container {
//     background-image: url(${img});
//     background-size: cover;
//     background-position: center;
//     height: 100%;
//     width: 100%;
// }
// .navcard__img__container--blur {
//     filter: blur(4px);
//     -webkit-filter: blur(3px);
// }

const PhotoCard = ({ url, title, isLast }) => {
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
            className="h-screen w-full relative flex items-center content-center overflow-hidden"
            style={{
                scrollSnapAlign: "center"
            }}
        >
            <div className="z-10 absolute w-full">
                <img
                    key={url}
                    className="h-full max-w-md mx-auto"
                    style={{
                        boxShadow: "1px 1px 20px rgba(0,0,0,0.5)",
                        width: "85%"
                    }}
                    src={url}
                    title={title}
                />
            </div>
            <div style={backgroundStyles} />
            {!isLast && (
                <div
                    className="absolute w-full text-center text-gray-700 z-20"
                    style={{ bottom: "10%" }}
                >
                    <button
                        onClick={() =>
                            window.scrollBy({
                                left: 0,
                                top: window.innerHeight,
                                behavior: "smooth"
                            })
                        }
                        className="focus:outline-none shadow-lg focus:bg-white focus:shadow-2xl text-black rounded-full h-8 w-8"
                        style={{
                            backgroundColor: "white",
                            background:
                                "-webkit-linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45))"
                        }}
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
        scrollSnapType: "mandatory",
        scrollSnapPointsY: "repeat(100vh)",
        scrollSnapType: "mandatory y"
    };

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
