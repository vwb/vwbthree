import Image from "next/image";

const ImageWrapper = ({ url, title }) => (
    <Image
        key={url}
        src={url}
        title={title}
        alt={title}
        priority={true}
        fill
        sizes="100vw"
        style={{
            objectFit: "contain"
        }}
    />
);

const Photo = props => {
    const backgroundStyles = {
        background: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%"
    };

    const image = (
        <ImageWrapper url={props.photo.url} title={props.photo.displayName} />
    );

    return (
        <>
            <div
                className="z-10 absolute w-full"
                style={
                    props.style || {
                        height: "70%"
                    }
                }
            >
                {props.render ? props.render(image) : image}
            </div>
            <div style={backgroundStyles} />
        </>
    );
};

export default Photo;
