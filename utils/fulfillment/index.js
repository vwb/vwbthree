import { updateOrderStatus } from "../order";

export async function handleCompletedCheckout(event) {
    const orderId = event?.data?.object?.metadata?.orderId;

    const userData = {
        email: event?.data?.object?.customer_details?.email,
        name: event?.data?.object?.customer_details?.name,
        shipping_address: event?.data?.object?.shipping
    };

    if (!orderId) {
        throw new Error(
            "Missing order id for checkout session. Abandoning order"
        );
    }

    if (!userData.shipping_address) {
        throw new Error("Missing shipping information");
    }

    //call prodigi and create order here
    await createProdigiOrder(event);

    //after successfully generating prodigi order
    await updateOrderStatus(orderId, "processing", userData);
}

async function createProdigiOrder() {
    //map incoming items (photo name, SKU, #) to an api request
}

/**
 * {
  id: 'evt_1NKrrqJZzU9yu3SFrzdXsu7R',
  object: 'event',
  api_version: '2020-08-27',
  created: 1687218738,
  data: {
    object: {
      id: 'cs_test_a1hn1vxXujtp80MBKKoEeIJOnDnGzbVm2FS8cdtNgoJPWb6FC1OEQBwzI4',
      object: 'checkout.session',
      after_expiration: null,
      allow_promotion_codes: null,
      amount_subtotal: 2000,
      amount_total: 2000,
      automatic_tax: [Object],
      billing_address_collection: 'auto',
      cancel_url: 'http://localhost:3000/photos/cart',
      client_reference_id: null,
      consent: null,
      consent_collection: null,
      created: 1687218714,
      currency: 'usd',
      currency_conversion: null,
      custom_fields: [],
      custom_text: [Object],
      customer: 'cus_O7631vfPMgIZ2g',
      customer_creation: 'always',
      customer_details: [Object],
      customer_email: null,
      expires_at: 1687305114,
      invoice: null,
      invoice_creation: [Object],
      livemode: false,
      locale: null,
      metadata: [Object],
      mode: 'payment',
      payment_intent: 'pi_3NKrrSJZzU9yu3SF0nEnpg6z',
      payment_link: null,
      payment_method_collection: 'always',
      payment_method_options: {},
      payment_method_types: [Array],
      payment_status: 'paid',
      phone_number_collection: [Object],
      recovered_from: null,
      setup_intent: null,
      shipping: [Object],
      shipping_address_collection: [Object],
      shipping_options: [],
      shipping_rate: null,
      status: 'complete',
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:3000/photos/orders/44322af0-0efc-11ee-8f0d-370e6e24b853',
      total_details: [Object],
      url: null
    }
  },
  livemode: false,
  pending_webhooks: 2,
  request: { id: null, idempotency_key: null },
  type: 'checkout.session.completed'
}
 */
