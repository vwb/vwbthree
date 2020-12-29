import Image from "next/image";

const ImageWrapper = ({ url, title }) => (
    <Image
        key={url}
        layout="fill"
        objectFit="contain"
        src={url}
        title={title}
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
        <ImageWrapper
            url={props.photo.url}
            title={props.photo.title}
            isRaised={true}
        />
    );

    return (
        <>
            <div
                className="z-10 absolute w-9/12"
                style={
                    props.style || {
                        height: "70%",
                        transform: "translateX(15%)"
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
