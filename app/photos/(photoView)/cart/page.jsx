import { CartItems, FooterContent } from "./CartView";
import Panel from "../../../../components/Panel";

export default async function Page({ params }) {
    // Forward fetched data to your Client Component
    return (
        <>
            <main
                style={{
                    paddingTop: "60px",
                    maxWidth: "400px",
                    margin: "0 auto"
                }}
            >
                <CartItems />
            </main>
            <Panel>
                <FooterContent />
            </Panel>
        </>
    );
}
