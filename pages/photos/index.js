import { PHOTOS_JSON } from "../../data/images";
import Layout from "../../components/layout";
import Link from "next/link";

const PhotosIndex = () => {
    return (
        <Layout isOpenDefault={false}>
            <div className="flex flex-wrap content-center">
                {PHOTOS_JSON.map(({ url, title, id }) => (
                    <div
                        className="w-full sm:w-1/2 lg:w-1/4 p-4 self-center"
                        key={url}
                    >
                        <Link href="/photos/[id]" as={`/photos/${id}`}>
                            <a>
                                <img
                                    className="mx-auto align-middle bg-grey-100"
                                    src={url}
                                    alt={title}
                                />
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default PhotosIndex;
