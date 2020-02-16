import { PHOTO_DATA } from "../../data/images";

const PhotosIndex = () => {
    return (
        <div>
            {PHOTO_DATA.map(img => (
                <img key={img} src={img} />
            ))}
        </div>
    );
};

export default PhotosIndex;
