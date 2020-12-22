import Blur from "./Blur";
import Image from 'next/image';

const ImageWrapper = ({ url, title, isRaised }) => (
    <Image
        key={url}
        layout="fill"
        className="max-w-xl mx-auto w-4/5 sm:w-3/5 md:w-auto"
        style={isRaised ? { boxShadow: "1px 1px 20px rgba(0,0,0,0.5)" } : ""}
        src={url}
        title={title}
    />
);

const Photo = props => {
    const DEFAULT_BACKGROUND =
        "rgba(85, 85, 85, 0.45), rgba(85, 85, 85, 0.45))";
    const DARK_BACKGROUND = `-webkit-linear-gradient(${
        props.backgroundOverlay ? props.backgroundOverlay : DEFAULT_BACKGROUND
    }, url(${props.photo.url})`;
    const backgroundStyles = {
        background: DARK_BACKGROUND,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%"
    };

    const image = (
        <ImageWrapper
            url={props.photo.url}
            title={props.photo.title}
            isRaised={true}
        />
    );

    return (
        <>
            <Blur />
            <div className="z-10 absolute w-full">
                {props.render ? props.render(image) : image}
            </div>
            <div style={backgroundStyles} />
        </>
    );
};

export default Photo;
