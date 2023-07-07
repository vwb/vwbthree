import nodemailer from "nodemailer";
import {
    OrderConfirmationEmail,
    OrderShippedEmail
} from "../../email_templates";
import { render } from "@react-email/render";
import * as aws from "@aws-sdk/client-ses";

const SENDER = "vwbthree <vwbthree.photos@gmail.com>";

const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.AWS_PHOTOS_DB_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
        secretAccessKey: process.env.AWS_PHOTOS_DB_SECRET_KEY // Do NOT HARD-CODE your secret credentials here
    }
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: { ses, aws },
    sendingRate: 1
});

/**
 * SendEmailConfig {
 *  recipient: string;
 *  template: string;
 *  templateData: Object;
 * }
 *
 * @param {*} config
 */
export async function sendOrderConfirmationEmail(config) {
    /**
     * need:
     *  name
     *  email
     *  orderUUID
     *  lineItemsImages
     */

    const emailHtml = render(
        <OrderConfirmationEmail orderId={config.orderId} />
    );
    const mailConfiguration = {
        from: SENDER,
        to: config.recipient,
        subject: `Order Received`,
        html: emailHtml
    };

    try {
        await transporter.sendMail(mailConfiguration);
    } catch (e) {
        console.error("Error sending email for order: ", congif.orderId);
        console.error(e.message);
    }
}

/**
 * SendEmailConfig {
 *  recipient: string;
 *  template: string;
 *  templateData: Object;
 * }
 *
 * @param {*} config
 */
export async function sendOrderShippedEmail(config) {
    /**
     * need:
     *  name
     *  email
     *  orderUUID
     *  lineItemsImages
     */

    const emailHtml = render(<OrderShippedEmail orderId={config.orderId} />);

    const mailConfiguration = {
        from: SENDER,
        to: config.recipient,
        subject: `Order Shipped!`,
        html: emailHtml
    };

    try {
        await transporter.sendMail(mailConfiguration);
    } catch (e) {
        console.error("Error sending email for order: ", congif.orderId);
        console.error(e.message);
    }
}
