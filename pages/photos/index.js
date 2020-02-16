import { PHOTO_DATA } from "../../data/images";

const PhotosIndex = () => {
    return (
        <div className="flex flex-wrap content-center">
            {PHOTO_DATA.map(img => (
                <div
                    className="w-full sm:w-1/2 lg:w-1/4 p-4 self-center"
                    key={img}
                >
                    <img
                        className="mx-auto align-middle bg-grey-100"
                        src={img}
                    />
                </div>
            ))}
        </div>
    );
};

export default PhotosIndex;
