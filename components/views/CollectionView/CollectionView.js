import React from "react";
import NavCard from "../../navCard";
import Link from "next/link";

const PhotoGroupCard = props => {
    const href = props.isLocationView
        ? `/photos/locations/${props.slug}`
        : `/photos/collections/${props.slug}`;

    return (
        <div className="pt-6 px-4 object-center sm:w-1/3 lg:w-1/4 w-1/2 h-80 md:h-96">
            <Link href={href}>
                <NavCard
                    blur={false}
                    img={props.url}
                    imgAlt={props.name}
                    containerStyles={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "350px",
                        fontFamily: "Simsun",
                        boxShadow: "1px 1px 5px gray",
                        fontSize: "1.15rem",
                        margin: "0 auto"
                    }}
                >
                    <div
                        style={{
                            background: "black",
                            padding: "6px 8px 6px 8px"
                        }}
                    >
                        {props.name}
                    </div>
                </NavCard>
            </Link>
        </div>
    );
};

//TODO: Update the unlisted collections item to a link/something nicer visually
const PhotosIndex = props => {
    return (
        <main className="pt-12 pb-6 max-w-screen-xl mx-auto">
            <div className="flex justify-center flex-wrap">
                {Object.keys(props.collections).map(data => (
                    <PhotoGroupCard
                        key={data}
                        slug={data}
                        url={props.collections[data].url}
                        name={data}
                        isLocationView={props.isLocationView}
                    />
                ))}
            </div>
            {props.unlistedCollections.length > 0 ? (
                <section className="text-center pt-10 text-gray-900">
                    {/* 
                        //TODO: Better handle the unlisted collection rendering
                        <div>Other collections:</div>
                        {props.unlistedCollections.map(collection => (
                            <span className="pl-2 pr-2">{collection}</span>
                        ))} */}
                </section>
            ) : null}
        </main>
    );
};

export default PhotosIndex;
