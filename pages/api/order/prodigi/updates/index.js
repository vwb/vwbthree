import { updateOrderStatus } from "../../../../../utils/order";

const PRODIGI_STATUS_MAP = {
    Complete: "shipped",
    Cancelled: "cancelled"
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const orderId = req.body.data.order.idempotencyKey;
        const prodigiStatus = req.body.data.order.status.stage;
        const statusUpdate = PRODIGI_STATUS_MAP[prodigiStatus];

        try {
            if (!!statusUpdate) {
                updateOrderStatus(orderId, statusUpdate);
                //trigger email
            }
        } catch (e) {
            console.error("Error updating order status", e.message);
        }

        res.json({ received: true });
    }
}

/**
 * {
  "specversion": "1.0",
  "id": "evt_891953",
  "type": "com.prodigi.order.status.stage.changed#Complete",
  "source": "https://api.sandbox.prodigi.com/v4.0/Orders/",
  "time": "2023-06-21T23:29:16.287Z",
  "datacontenttype": "application/json",
  "subject": "ord_1096204",
  "data": {
    "order": {
      "id": "ord_1096204",
      "created": "2023-06-21T23:03:53.547Z",
      "lastUpdated": "2023-06-21T23:03:53.617Z",
      "callbackUrl": null,
      "merchantReference": null,
      "shippingMethod": "Budget",
      "idempotencyKey": null,
      "status": {
        "stage": "Complete",
        "issues": [],
        "details": {
          "downloadAssets": "Complete",
          "printReadyAssetsPrepared": "Complete",
          "allocateProductionLocation": "Complete",
          "inProduction": "Complete",
          "shipping": "Complete"
        }
      },
      "charges": [
        {
          "id": "chg_460643",
          "prodigiInvoiceNumber": null,
          "totalCost": { "amount": "17.95", "currency": "USD" },
          "totalTax": { "amount": "0.00", "currency": "USD" },
          "items": [
            {
              "id": "chi_962283",
              "itemId": null,
              "cost": { "amount": "5.95", "currency": "USD" },
              "shipmentId": "shp_658633",
              "chargeType": "Shipping"
            },
            {
              "id": "chi_962285",
              "itemId": "ori_1408593",
              "cost": { "amount": "12.00", "currency": "USD" },
              "shipmentId": null,
              "chargeType": "Item"
            }
          ]
        }
      ],
      "shipments": [
        {
          "id": "shp_658633",
          "dispatchDate": "2023-06-21T23:19:13.39Z",
          "carrier": { "name": "USPS", "service": "USPS First Class Post" },
          "fulfillmentLocation": {
            "countryCode": "US",
            "labCode": "prodigi_us"
          },
          "tracking": {
            "number": "PH000000000GB",
            "url": "https://www.royalmail.com/portal/rm/track?trackNumber=PH000000000GB"
          },
          "items": [{ "itemId": "ori_1408593" }],
          "status": "Shipped"
        }
      ],
      "recipient": {
        "name": "V",
        "email": "vinchenzio@gmail.com",
        "phoneNumber": null,
        "address": {
          "line1": "195 Eureka Street",
          "line2": null,
          "postalOrZipCode": "94114",
          "countryCode": "US",
          "townOrCity": "San Francisco",
          "stateOrCounty": "CA"
        }
      },
      "items": [
        {
          "id": "ori_1408593",
          "status": "Ok",
          "merchantReference": null,
          "sku": "GLOBAL-PAP-10X12",
          "copies": 1,
          "sizing": "fillPrintArea",
          "thumbnailUrl": "https://pwintyimages.blob.core.windows.net/sandbox/1096204/658633/default-203637-thumbnail.jpg?skoid=009f1b38-a92b-43fc-ae89-352f73d0bbb0&sktid=95af27ff-c62f-4dc3-b489-99265b850f61&skt=2023-06-21T23%3A24%3A15Z&ske=2023-06-27T23%3A29%3A15Z&sks=b&skv=2021-10-04&sv=2021-10-04&st=2023-06-21T23%3A29%3A15Z&se=2023-06-28T23%3A29%3A15Z&sr=b&sp=rw&sig=IFpWI7ldGB4RptWdHQql5m7Aj3idcAUvBu%2BGgR1Q9NU%3D",
          "attributes": {},
          "assets": [
            {
              "id": "ast_415717",
              "printArea": "default",
              "md5Hash": "5548958c77123b66fde45e7671c238c3",
              "url": "https://vwbthree-photos--private.s3.us-west-1.amazonaws.com/DSC09372.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU5WDTM3CUX2T4JM4%2F20230621%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230621T230350Z&X-Amz-Expires=120&X-Amz-Signature=c547b000ff6f01c7518b05bc717681d73d44428838b80e5ab6875eaa3adecd57&X-Amz-SignedHeaders=host&x-id=GetObject",
              "thumbnailUrl": "https://pwintyimages.blob.core.windows.net/sandbox/1096204/658633/default-203637-thumbnail.jpg?skoid=009f1b38-a92b-43fc-ae89-352f73d0bbb0&sktid=95af27ff-c62f-4dc3-b489-99265b850f61&skt=2023-06-21T23%3A24%3A15Z&ske=2023-06-27T23%3A29%3A15Z&sks=b&skv=2021-10-04&sv=2021-10-04&st=2023-06-21T23%3A29%3A15Z&se=2023-06-28T23%3A29%3A15Z&sr=b&sp=rw&sig=IFpWI7ldGB4RptWdHQql5m7Aj3idcAUvBu%2BGgR1Q9NU%3D",
              "status": "Complete"
            }
          ],
          "recipientCost": null,
          "correlationIdentifier": "18706508452758528"
        }
      ],
      "packingSlip": null,
      "metadata": null
    },
    "traceParent": "|f9cfff9c-916d-4d6e-9165-e2b30f939f0b.8d019959_"
  }
}
 */
