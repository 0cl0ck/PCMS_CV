# FAQs

##### Answers to some of our most **Frequently Asked Questions** about Smart Checkout.

- [When should I use recurring payments rather than one-off payments?](#when-should-i-use-recurring-payments-rather-than-one-off-payments)
- [When should I use a pre-authorization rather than a direct charge?](#when-should-i-use-a-pre-authorization-rather-than-a-direct-charge)
- [Can I offer payments with card installments to my customers?](#can-i-offer-payments-with-card-installments-to-my-customers)
- [Can the amount I charge my customer include a tip?](#can-the-amount-i-charge-my-customer-include-a-tip)
- [What should I do if I sell to international shoppers?](#what-should-i-do-if-i-sell-to-international-shoppers)
- [What local payment methods can I offer to my customers?](#what-local-payment-methods-can-i-offer-to-my-customers)
- [Can I indicate my preferred payment method?](#can-i-indicate-my-preferred-payment-method)
- [How do I ensure a high conversion rate?](#how-do-i-ensure-a-high-conversion-rate)
- [Can I send a payment request link through email?](#can-i-send-a-payment-request-link-through-email)
- [Can I allow customers to enter their desired amount to pay?](#can-i-allow-customers-to-enter-their-desired-amount-to-pay)
- [How much effort does it take to do the integration?](#how-much-effort-does-it-take-to-do-the-integration)
- [Get Support](#get-support)

### When should I use recurring payments rather than one-off payments?

If the payment is automatically done by you (the merchant), without the involvement or presence of the customer, you should use recurring payments rather than one-off payments.

Use case (merchant): charge automatically a [subscription](/payment-tools/subscriptions/) or a bill, for a fixed or variable amount, on a regular or non-regular schedule.

A recurring payment is a payment made automatically by the merchant, initiated by the merchant without the involvement or presence of the customer (no 3DS authentication is required), done on a regular or non-regular schedule, for a fixed or variable amount (the payments may be for different amounts over time). This requires an initial payment to be done with the involvement of the customer (3DS authentication may be required), during which the customer provides consent to the merchant to make future automatic payments (recurring payments).

**Find out about recurring payments and subscriptions: [Create a recurring payment](/tutorials-for-payments/create-a-recurring-payment/), [Subscriptions](/payment-tools/subscriptions/).**

Recurring payments are not available with [pre-authorizations](/tutorials-for-payments/handle-pre-authorizations) or [card installments](/tutorials/payments/handle-payments-with-installments/).

### When should I use a pre-authorization rather than a direct charge?

If the transfer of funds is to be initiated later, but you now want to ensure the customer has the required funds and in fact reserve these funds, you should use a pre-authorization rather than a direct charge.

Use cases (customer): make a reservation (e.g. hotel), place a pre-order, and so on.

Use cases (merchant): place a hold on the funds until the order is shipped, and so on.

**Find out about pre-authorizations: [Handle pre-authorizations](/tutorials-for-payments/handle-pre-authorizations/).**

Pre-authorizations are not available with [recurring payments](/tutorials-for-payments/create-a-recurring-payment) or [card installments](/tutorials/payments/handle-payments-with-installments/).

### Can I offer payments with card installments to my customers?

You can offer your customers the option of paying with card installments (automatically splitting the total purchase amount into smaller equal payments) as long as the following criteria are met:

- You registered your Viva account in Greece
- The customer’s card supports installments

**Please note**: If offering installments, the value provided by the merchant is _not_ the number of installments the customer will select, and it is _not_ mandatory for the customer to select installments at all. The process is as follows:

1.  The merchant indicates the **maximum** number of installments they wish to offer to the customer
2.  It is then **up to the customer** whether they pay with or without installments
3.  If the customer decides to pay with installments, they are able to select the **number** of installments (_up to the maximum specified by the merchant_)

**Find out about card installments: [Pay by card installments](/tutorials/payments/handle-payments-with-installments/) option.**

Card installments are not available with [recurring payments](/tutorials-for-payments/create-a-recurring-payment) or [pre-authorizations](/tutorials-for-payments/handle-pre-authorizations/).

### Can the amount I charge my customer include a tip?

You have the possibility within every payment order to charge a tip to customers which is then included in the total amount. To set the tip amount, you simply pass the required value via the `tipAmount` parameter.

**Find out about `tipAmount` and other parameters: [Create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post).**

### What should I do if I sell to international shoppers?

Make sure you present Smart Checkout in the language of the customer. For each payment, just pass through to Smart Checkout the language that you want it to presented in; use the `requestLang` parameter.

**Find out about `requestLang` and other parameters: [Create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post).**

Make sure you offer local payment methods that are familiar to your customers (_please see the following question below_).

### What local payment methods can I offer to my customers?

The local payment methods that you can offer to your customers depend on the country in which you registered your Viva account and on your MCC (Merchant Category Code). Some of these payment methods will have been automatically activated for you by us (e.g. Apple Pay), other payment methods can be activated by yourself (e.g. PayPal), for others you need to get in touch with us to activate them for you.

**Find out about payment methods: [Payment methods](/payment-methods/).**

### Can I indicate my preferred payment method?

You have the option to specify the payment method that will be already selected for the customer to pay with; the customer will still have the option to pay with any other payment method

**Find out how to set your desired payment method: [Set your desired payment method](/tutorials-for-payments/preferred-payment-method/).**

### How do I ensure a high conversion rate?

A high conversion rate depends on a happy user journey by doing the following:

- Customer name and email address in the Smart Checkout payment page should be automatically prefilled to make the customer’s life easier. See `fullName` and `email` parameters.
- The payment description should be completed with details of the order so that the customer understands what they are paying for. See `customerTrns` parameter.
- Set the desired language for the Smart Checkout payment page (see relevant question above).
- You should add your company logo (128 x 128 pixels – 500KB).
- Offer all the popular payment methods (see relevant question above).

**Find out about the payment order parameters: [Create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post).**

**Find out about adding a logo: See _Step 6_ of [Payment source for Smart Checkout](/getting-started/create-a-payment-source/payment-source-for-checkouts).**

### Can I send a payment request link through email?

Yes, of course. Merchants using payment links can create flexible payment options using Smart Checkout. By setting the parameter `paymentNotification` value to true, you can automatically send a payment link to customer’s email and allow them to make payments. When the customer clicks to the link, they are redirected to a secure payment page where they can select one of available payment methods and complete the payment.

- Customers don’t need to download an additional app in order to make their payment.
- You receive a notification when the payment has been completed

**Find out about `paymentNotification` and other parameters: [Create payment order](/tutorials-for-payments/create-a-payment-order).**

### Can I allow customers to enter their desired amount to pay?

You can allow buyers to enter a custom amount on the checkout form. You should set the `disableExactAmount` parameter value to true for enabling this feature.

**Find out about `disableExactAmount` and other parameters: [Create payment order](/tutorials-for-payments/create-a-payment-order).**

### How much effort does it take to do the integration?

The integration is very simple and minimal effort is required from your side.

Keep in mind to perform a proper redirect and not use an iframe. Using an iframe will disable certain features, it will also result in a poor user experience, and thus overall reduce significantly your conversion rates. Customers are accustomed to being redirected to a payment page to conclude their purchase online.

Also, no effort is required for Smart Checkout updates, as Viva handles any enhancements to offer new features and additional payment methods on an ongoing basis.

**Find out about Smart Checkout integration: [Smart Checkout Integration](/smart-checkout/smart-checkout-integration).**

### Get Support

If you would like to integrate with Viva, or if you have any queries about our products and solutions, please see our [**Contact & Support**](/get-support) page to see how we can help!
