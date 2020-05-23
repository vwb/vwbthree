import { getAllPhotoPaths, getPhotoData } from "../../lib/photos";

const PhotoDetailPage = ({ photo }) => {
    return (
        <div>
            {photo.title} <img src={photo.url} />{" "}
        </div>
    );
};

export async function getStaticPaths() {
    const paths = getAllPhotoPaths();

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const id = params.slug.split("--")[1];
    const photo = getPhotoData(id);

    return { props: { photo } };
}

export default PhotoDetailPage;
