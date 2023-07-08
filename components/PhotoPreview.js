import Link from "next/link";
import Image from "next/image";

export const PhotoPreview = ({ photo }) => {
    return (
        <Link href={`/photos/${photo.displayName}--${photo.photoName}`}>
            <div
                style={{
                    width: "120px",
                    height: "120px",
                    position: "relative"
                }}
            >
                <Image
                    src={photo.url}
                    fill
                    alt={photo.displayName}
                    sizes="200px"
                    style={{
                        objectFit: "contain",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.33))"
                    }}
                />
            </div>
        </Link>
    );
};
