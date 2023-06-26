import { Container, Link } from "@react-email/components";

export const Footer = () => (
    <Container style={{ marginTop: "24px", textAlign: "left" }}>
        <div
            style={{
                width: "100%",
                border: "1px solid #DADADA"
            }}
        />
        <div style={{ paddingTop: "12px" }} />
        <Link
            href={`https://vwbthree.me/photos/`}
            style={{
                paddingTop: "16px",
                color: "#333",
                fontSize: "14px",
                textDecoration: "underline"
            }}
        >
            vwbthree photography
        </Link>
    </Container>
);
