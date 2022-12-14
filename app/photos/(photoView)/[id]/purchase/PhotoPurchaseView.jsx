import Panel from "../../../../../components/Panel";
import PhotoView from "../../../../../components/Photo";
import {
    PhotoPurchaseStatefulWrapper,
    FooterContent,
    ProductSelection
} from "./StatefulPurchase";

const PreviewPanel = ({ photo }) => {
    return (
        <div style={{ paddingTop: "80px", height: "305px" }}>
            <PhotoView
                style={{
                    height: "225px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.33))"
                }}
                photo={photo}
            />
        </div>
    );
};

const ProductDetails = ({ products }) => {
    return (
        <section
            style={{
                paddingLeft: "36px",
                paddingRight: "36px",
                marginTop: "48px"
            }}
        >
            <h2 className="text-2xl">Prints</h2>
            <ProductSelection products={products} />
            <div className="text-xs" style={{ marginTop: "24px" }}>
                Prints are printed on 240gsm Lustre Photo Paper using Giclee
                process with a satin finish. They are sourced via the
                <a
                    className="text-blue-700"
                    href="https://www.prodigi.com/products/prints-and-posters/photo-prints/lustre-photo-paper/"
                >
                    {" "}
                    Prodigi
                </a>{" "}
                printing service.{" "}
            </div>
        </section>
    );
};

export const PhotoPurchaseView = ({ photo, products }) => {
    return (
        <>
            <PreviewPanel photo={photo} />
            <PhotoPurchaseStatefulWrapper>
                <main style={{ maxWidth: "400px", margin: "0 auto" }}>
                    <ProductDetails products={products} />
                </main>
                <Panel>
                    <FooterContent />
                </Panel>
            </PhotoPurchaseStatefulWrapper>
        </>
    );
};

export default PhotoPurchaseView;
