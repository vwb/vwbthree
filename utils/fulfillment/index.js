import { createSignedDownloadUrlForAsset } from "../assets";
import { postProdigiOrder } from "../prodigi";

export async function createProdigiOrder(orderId, userData, orderData) {
    let formattedProducts;
    let recipient;

    try {
        formattedProducts = await constructProducts(orderData);
        recipient = constructRecipient(userData);
    } catch (e) {
        console.error(
            "Error constructing prodigi order body for order: ",
            orderId
        );
        throw e;
    }

    try {
        console.log("Creating prodigi order for: ", orderId);

        const order = await postProdigiOrder({
            recipient,
            formattedProducts,
            orderId
        });

        return order;
    } catch (e) {
        console.log("Error creating order with Prodigi for order: ", orderId);
        throw e;
    }
}

/**
 * OrderItems {
 *  itemPrintSize: string
 *  photoId: string
 *  photoName: string
 *  photoUrl: string
 *  quantity: number
 *  sku: string
 * }[]
 *
 * @param {*} orderLineItems: OrderItems
 */
async function constructProducts(orderLineItems) {
    const prodigiItems = [];
    const signedUrlMap = new Map();

    //TODO: Update to do promise.all instead of sequential handler
    for (const item of orderLineItems) {
        let signedAssetUrl;
        const quantity = item.quantity;

        if (signedUrlMap.has(item.photoId)) {
            signedAssetUrl = signedUrlMap.get(item.photoId);
        } else {
            signedAssetUrl = await createSignedDownloadUrlForAsset(
                `${item.photoId}.jpg`
            );
            signedUrlMap.set(item.photoId, signedAssetUrl);
        }

        prodigiItems.push({
            sizing: "fillPrintArea",
            copies: quantity,
            sku: item.sku,
            assets: [
                {
                    url: signedAssetUrl,
                    printArea: "default"
                }
            ]
        });
    }

    return prodigiItems;
}

/**
 * ProdigiRecipient {
 * 
    "address": {
        "line1": "14 test place",
        "line2": "test",
        "postalOrZipCode": "12345",
        "countryCode": "US",
        "townOrCity": "somewhere",
        "stateOrCounty": "somewhereelse"
    },
    "name": "John Testman",
    "email": "jtestman@prodigi.com"
}
 * 
 * 
 * @param {*} event 
 */
function constructRecipient(userData) {
    return {
        name: userData.shipping_address.name,
        email: userData.email,
        address: {
            line1: userData.shipping_address.address.line1,
            line2: userData.shipping_address.address.line2,
            postalOrZipCode: userData.shipping_address.address.postal_code,
            countryCode: userData.shipping_address.address.country,
            townOrCity: userData.shipping_address.address.city,
            stateOrCounty: userData.shipping_address.address.state
        }
    };
}
