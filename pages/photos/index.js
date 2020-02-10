const PhotosIndex = () => {
    return <div>Photo gallery will go here</div>;
};

PhotosIndex.getInitialProps = async context => {
    const photos = getPhotos();
};

export default PhotosIndex;
