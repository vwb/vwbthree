import {
    Body,
    Container,
    Head,
    Html,
    Link,
    Preview,
    Text
} from "@react-email/components";
import { Footer } from "../../components/Footer";
import { Heading } from "../../components/Heading";
import * as React from "react";

/**
 * OrderConfirmationProps {
 *  orderId: string;
 * }
 *
 * @param {} props
 */
export const OrderConfirmationEmail = props => {
    return (
        <Html>
            <Head />
            <Preview>
                🎉 Your order has been received and it is being processed.
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading>
                        Order Received!
                        <div style={{ marginTop: "24px" }}>🎉</div>
                    </Heading>
                    <Text
                        style={{
                            ...text,
                            paddingBottom: "12px",
                            paddingTop: "12px",
                            marginTop: "-16px"
                        }}
                    >
                        Check out the link below for latest status on your
                        order.
                    </Text>
                    <Link
                        href={`https://vwbthree.me/photos/orders/${props.orderId}`}
                        style={{
                            padding: "8px 12px 8px 12px",
                            border: "2px solid black",
                            color: "#333",
                            fontSize: "22px"
                        }}
                    >
                        View Order
                    </Link>
                    <Container
                        style={{
                            paddingBottom: "12px",
                            paddingTop: "12px",
                            paddingLeft: "36px",
                            paddingRight: "36px"
                        }}
                    >
                        <Text style={text}>
                            Thank you for ordering from vwbthree photography.
                            Keep up to date with latest photos, sales, and more
                            on my instagram{" "}
                            <Link
                                href="https://www.instagram.com/vwbthree/"
                                style={{
                                    ...link,
                                    color: "#333",
                                    fontWeight: "bold"
                                }}
                            >
                                @vwbthree
                            </Link>
                            .
                        </Text>
                    </Container>
                    <Footer />
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    width: "100%",
    backgroundColor: "#ffffff",
    margin: "0 auto"
};

const container = {
    textAlign: "center",
    margin: "0 auto"
};

const link = {
    color: "#2754C5",
    fontSize: "14px",
    textDecoration: "underline"
};

const text = {
    color: "#333",
    fontSize: "16px",
    margin: "24px 0"
};
