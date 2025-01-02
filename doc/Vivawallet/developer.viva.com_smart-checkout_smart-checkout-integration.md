# Smart Checkout Integration

##### A guide to the **integration process** for Smart Checkout.

-   [Before you start](#before-you-start)
    -   [Payment method messaging](#payment-method-messaging)
-   [Integration flow diagram](#integration-flow-diagram)
-   [Integration flow instructions](#integration-flow-instructions)
    -   [Step 1: Create the payment order](#step-1-create-the-payment-order)
        -   [Best practices](#best-practices)
    -   [Step 2: Redirect the customer to Smart Checkout to pay the payment order](#step-2-redirect-the-customer-to-smart-checkout-to-pay-the-payment-order)
        -   [Optional (but recommended): specify brand color](#optional-but-recommended-specify-brand-color)
        -   [Optional: specify pre-selected payment method](#optional-specify-pre-selected-payment-method)
        -   [Optional: Display a cancel button on Smart Checkout](#optional-display-a-cancel-button-on-smart-checkout)
    -   [Step 3: Confirm the payment of the payment order](#step-3-confirm-the-payment-of-the-payment-order)
    -   [Step 4: Verify payment](#step-4-verify-payment)
        -   [Webhook (Transaction Payment Created) - recommended](#webhook-transaction-payment-created-recommended)
        -   [API Call (Retrieve Transaction) - alternative](#api-call-retrieve-transaction-alternative)
-   [Integrate a mobile app with Smart Checkout](#integrate-a-mobile-app-with-smart-checkout)
-   [Go-Live](#go-live)
    -   [Pre-Go-Live Checklist](#pre-go-live-checklist)
    -   [Go-Live Steps](#go-live-steps)
-   [Additional use cases](#additional-use-cases)
    -   [Recurring payments](#recurring-payments)
    -   [Pre-authorizations](#pre-authorizations)
-   [Further Information](#further-information)
-   [Get Support](#get-support)

### Before you start

1.  [Create an account](/getting-started/#1-create-account) with Viva, if you do not already have one:
    -   [Sandbox/demo account](/getting-started/sandbox-demo-account), for testing purposes
    -   [Production/live account](/getting-started/production-live-account/), for payments in the real world
2.  Log in to your [demo account](https://demo.vivapayments.com/en/signup) or [live account](https://app.vivawallet.com/register/)
3.  [Create a payment source](/getting-started/create-a-payment-source/payment-source-for-checkouts) in order to provide details such as your domain name for your online store, your company logo, your success (thank you) page, and so on.  
    Make a note of the **source code**, i.e. the 4-digit code of the payment source, you just created, as you will need it later on. It is important to provide your **company logo**, as this will be presented to the customer on Smart Checkout, and it will help the customer understand who this payment is for
4.  Determine which [payment methods](/payment-methods/) you want to offer to your customers. Some of these payment methods are automatically activated for you by us (e.g. Apple Pay), other payment methods can only be activated by yourself (e.g. PayPal), for others you need to get in touch with us to activate them for you after a further review of your business

#### Payment method messaging

It is important that the customer is aware of the [**payment methods**](/payment-methods/) you offer via Smart Checkout, as this will increase conversion and average order values.

You should let your customers know about the available payment options as they browse your online store, even before they decide to buy. Informing them early on will help the purchase decision, especially when offering BNPL or financing options. Doing so will create trust and let the customer know they can pay with whatever payment method is convenient to them. This is especially helpful for your international customers, as they will know they can pay with their own local payment method, even though they are shopping from a merchant from another country.

Display payment method icons or banners throughout your online store (indicatively: footer, homepage, product display page, cart/basket page, checkout, and so on) to captivate shoppers from the start, make your customers shop with confidence, help shoppers find the answers to their most commonly asked questions, and increase conversion. Especially when offering BNPL or financing options, inform your customers about their options as early as possible.

You can potentially include [**icons of the offered payment methods**](/payment-methods/payment-methods-icons/) in:

-   The footer or header of your online store
-   The individual product pages
-   The checkout page before redirecting the customer to Smart Checkout

Consider also including an FAQ to tell your customers everything they want to know about how to buy from you and all the payment methods you offer. This way, you’ll reduce any friction in the purchase journey as well as reducing contacts to your customer service team.

### Integration flow diagram

The below sequence diagram outlines the Smart Checkout integration procedure from beginning to end.

 mermaid.initialize({startOnLoad:true});

sequenceDiagram participant Merchant frontend participant Merchant backend participant Viva API Merchant backend->>Viva API:Create the payment order Viva API-->>Merchant backend:Payment order created Merchant backend-->>Merchant frontend:Payment order Merchant frontend->>Viva API:Redirect customer to Smart Checkout to pay the payment order Viva API-->>Merchant frontend:Confirm the payment of the payment order Merchant backend->>Merchant backend:Verify payment

### Integration flow instructions

The overall integration process is as follows:

1.  [Create the payment order](#step-1-create-the-payment-order)
2.  [Redirect the customer to Smart Checkout to pay the payment order](#step-2-redirect-the-customer-to-smart-checkout-to-pay-the-payment-order)
3.  [Confirm the payment of the payment order](#step-3-confirm-the-payment-of-the-payment-order)
4.  [Verify payment](#step-4-verify-payment)

#### Step 1: Create the payment order

You need to create a [payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post) every time you want to tell Viva that you require a certain amount of money from one of your customers. Think of it as a utility bill. You give Viva an order to issue a bill on your behalf. The bill is then sent to your customer and they have to pay a specific amount. Each Payment Order has a unique 16-digit ID also referred to as the **order code**.

Keep in mind that you need to define the `sourceCode` parameter when creating the payment order, i.e. the 4-digit code of the payment source you have created (please refer to the [Before you start](#before-you-start) section above). The payment sources you have created can be found in your viva banking app under the [payment sources](/getting-started/view-the-payment-source-list) for your website / app.

Find out more about the [Create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post) API call and its parameters.

You can create a payment order by using the below method through a **backend channel**.

##### Request example

Make the below call through a **backend channel**.

Note that you should use [OAuth2](/integration-reference/oauth2-authentication/) method for the authentication.

post    `/checkout/v2/orders`

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17199201-bb8cbae3-d205-4139-9630-914dcfe5e97b?action=collection%2Ffork&collection-url=entityId%3D17199201-bb8cbae3-d205-4139-9630-914dcfe5e97b%26entityType%3Dcollection%26workspaceId%3D71008394-7296-44d9-ad1c-ae1f239b5574)

Environment

URL

Production

https://api.vivapayments.com/checkout/v2/orders

Demo

https://demo-api.vivapayments.com/checkout/v2/orders

[cURL](#tab11) [PHP](#tab12)

```json
curl '[Environment URL]'
-H 'Authorization: Bearer [access token]'
-H 'Content-Type: application/json'
-d '{
    "amount": 1000,
    "customerTrns": "Short description of purchased items/services to display to your customer",
    "customer":
    {
        "email": "johdoe@vivawallet.com",
        "fullName": "John Doe",
        "phone": "+30999999999",
        "countryCode": "GB",
        "requestLang": "en-GB"
    },
    "paymentTimeout": 300,
    "preauth": false,
    "allowRecurring": false,
    "maxInstallments": 12,
    "paymentNotification": true,
    "tipAmount": 100,
    "disableExactAmount": false,
    "disableCash": true,
    "disableWallet": true,
    "sourceCode": "1234",
    "merchantTrns": "Short description of items/services purchased by customer",
    "tags":
    [
        "tags for grouping and filtering the transactions",
        "this tag can be searched on VivaWallet sales dashboard",
        "Sample tag 1",
        "Sample tag 2",
        "Another string"
    ],
    "cardTokens":
    [
        "ct_5d0a4e3a7e04469f82da228ca98fd661"
    ]
}'
```

```php
<?php
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => '[Environment URL]',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
 "amount": 1,
 "customerTrns": "string",
 "customer": {"email": "","fullName": "","phone": "","countryCode": "","requestLang": ""},
 "paymentTimeout": 0,
 "preauth": true,
 "allowRecurring": true,
 "maxInstallments": 0,
 "paymentNotification": true,
 "tipAmount": 1,
 "disableExactAmount": true,
 "disableCash": false,
 "disableWallet": false,
 "sourceCode": "Default",
 "merchantTrns": "string",
 "tags": ["string"],
 "cardTokens": ["ct_5d0a4e3a7e04469f82da228ca98fd661"]
}',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer [access token]',
    'Content-Type: application/json'
  ),
));
$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

##### Response example

If authentication is successful and the parameter values provided for the creation of the payment order are valid, an order code is returned in the response.

```json
{
    "orderCode": 1272214778972604
}
```

##### Best practices

Although the `fullName`, `email`, `customerTrns`, `requestLang` and `countryCode` parameters are optional, it is highly recommended to provide them as they will encourage high conversion rates:

-   `fullName` and `email` are requested by the customer in order to proceed with the payment, if not specified during the creation of the payment order (asking the customer to provide information that he has already provided creates frustration and may cause them to abandon the checkout process)
-   `customerTrns` provides information about what the customer is being asked to pay for (it is good practice to provide a reminder description of what they are paying for). _Please note_: you can also copy and paste emojis into this field if desired 😃
-   `requestLang` indicates the language that the payment page will appear in (make sure the customer views the payment page in their language, which is especially important for online stores with international customers)
-   `countryCode` indicates the country of the customer, which affects the [payment methods](/payment-methods/) that will be offered to the customer; keep in mind that certain payment methods are available only to customers that live in specific countries (make sure the customer is offered payment methods that they are familiar with and tend to use)

#### Step 2: Redirect the customer to Smart Checkout to pay the payment order

Redirect the customer to the Viva Smart Checkout via a browser using the below URI format. Replace the `OrderCode` value with the one generated in the previous step.

You should store and pass OrderCodes in `string` format, rather than `integer` format, in order to avoid exceeding JavaScript’s `MAX_SAFE_INTEGER` value of `9,007,199,254,740,991`. Otherwise, you may run into _‘OrderCode not found’_ and similar errors

Environment

URL

Production

https://www.vivapayments.com/web/checkout?**ref={OrderCode}**

Demo

https://demo.vivapayments.com/web/checkout?**ref={OrderCode}**

We strongly recommend that you perform a proper redirect, and you do **not** use an iframe. Using an iframe will disable certain features, it will also result in a poor user experience, and thus overall reduce significantly your conversion rates. Customers are accustomed to being redirected to a payment page to conclude their purchase online.  
  
Features that will **not** be available by using an iframe: paying with Apple Pay, saving cards or using saved cards, paying with certain payment methods (that require a redirection of their own such as Klarna, BLIK, EPS, P24, PayU & IRIS), remembering customer preferences (previously used payment methods, previously selected language, etc), dynamically showing payment methods most likely to convert, paying with Viva Wallet, and more.  
  
The customer experience will also be poor due to the risk of: poor screen layouts, content spilling over several screens and content being inaccessible due to poor positioning. Note also that some browsers do not properly support iframes, including the one within the Facebook mobile app, so your customers may be unable to even view your payment page.

**Below is the Smart Checkout form where the customer can enter their payment details and complete the payment:**

If your payment order contains either `allowRecurring` = `true` or `preauth` = `true`, only [**payment methods**](/payment-methods/) which support these features will be displayed to your customers

![Smart Checkout](/images/sc-new-general.png?width=600px)  

To simulate a successful payment in the demo environment, use one of our [**test cards**](/getting-started/test-cards) to mimic a payment of 30¢/30p or more.

##### Optional (but recommended): specify brand color

You have the option to specify your desired brand color to apply on Smart Checkout. This means that the overall styling (look & feel) of Smart Checkout will be adjusted to make use of your own brand color, rather than the default color.

You simply append the query parameter `color` to the URL as shown here:

Environment

URL

Production

https://www.vivapayments.com/web/checkout?ref={OrderCode}&**color={ColorCode}**

Demo

https://demo.vivapayments.com/web/checkout?ref={OrderCode}&**color={ColorCode}**

The color code can be any Hex color code but without the ## character. So for example, blue is `0000ff`, gold is `ffd700`, brown is `a52a2a` and so on. Once you decide which brand color you want to use, please carry out some testing to ensure the brand color looks correct on Smart Checkout (the use of white - `ffffff` - would not look good, for example)

If the `color` parameter value is null, invalid or missing, then the _default_ value (`06abc1`) will apply

###### Example

You may find below a few examples of different color codes being used:

Blue (hex code _0000ff_)

Gold (hex code _ffd700_)

Brown (hex code _a52a2a_)

![Blue Colored Smart Checkout](/images/sc-new-blue.png)

![Gold Colored Smart Checkout](/images/sc-new-gold.png)

![Brown Colored Smart Checkout](/images/sc-new-brown.png)

##### Optional: specify pre-selected payment method

You have the option to specify your desired preselected payment method. This means that you can specify the payment method that will be already selected for your customer (in essence your preferred payment method). The customer will be presented a particular method to pay with, while still having the option to pay with any other payment method.

You simply append the query parameter `paymentMethod` to the URL as shown here:

Environment

URL

Production

https://www.vivapayments.com/web/checkout?ref={OrderCode}&color={ColorCode}&**paymentMethod={MethodId}**

Demo

https://demo.vivapayments.com/web/checkout?ref={OrderCode}&color={ColorCode}&**paymentMethod={MethodId}**

You may find below all the possible values for the `paymentMethod` parameter:

MethodId

Payment Method

0 (default)

Credit Card

3

Cash (Viva Spot)

4

e-banking (ΔΙΑΣ)

8

Viva Wallet

10

iDEAL

11

P24

12

BLIK

13

PayU

17

EPS

18

WeChat Pay

19

BitPay

23

PayPal

24

Trustly

26

Klarna

27

Bancontact QR

28

Payconiq

29

IRIS

30

Pay By Bank

31

MB WAY

32

MULTIBANCO

34

tbi bank

35

Pay on Delivery

36

MobilePay Online

37

BANCOMAT Pay

38

Mastercard Click To Pay

41

Bluecode

43

Satispay

221

Swish

###### Example

You may find below an example with PayPal as the preselected payment method. The customer will be redirected to Smart Checkout which will present PayPal as preselected payment method, while still being able to pay with any other payment method he desires.

Environment

URL

Production

https://www.vivapayments.com/web/checkout?ref={OrderCode}&**paymentMethod=_23_**

Demo

https://demo.vivapayments.com/web/checkout?ref={OrderCode}&**paymentMethod=_23_**

If the `paymentMethod` parameter value is null, invalid or missing, then the _default_ value (Credit Card) will apply

![Smart Checkout with PayPal preselected](/images/sc-new-paypal.png?width=600px)

##### Optional: Display a cancel button on Smart Checkout

You have the flexibility to display a `Cancel` button on Smart Checkout. This option is fully configurable at the source level, granting you the control to determine whether an order code associated with a particular source should include the ‘Cancel’ button. When this option is activated, your customers will have the ability to cancel their orders directly from the Smart Checkout interface. This action results in the cancellation of the order without any payment being processed, and the customer is redirected to your specified failure URL. The query parameter for this cancellation information will be automatically appended to the failure URL.

In order to activate `Cancel` button on Smart Checkout, please follow [this guide](/getting-started/create-a-payment-source/payment-source-for-online-payments/#cancel-button).

If the `disablePaidState` parameter of the order is set to `true`, the redirection will take place without cancellation of the order

**Please note:**  
\- Currently, the Cancel button is supported for direct Smart Checkout integrations, as well as specific functionality for our [**Shopify**](/plugins/shopify/) & [**PrestaShop**](/plugins/prestashop-smart-checkout/) plugins  
\- It is possible to get webhooks for order cancellation events. Please follow [**this guide**](/webhooks-for-payments/order-updated/) to define a webhook for order cancellations.

![Cancel Button On Desktop View](/images/cancel-button.png?width=600px)

#### Step 3: Confirm the payment of the payment order

After the customer makes the payment on Smart Checkout, the customer is redirected back to your website. If the payment has been successful or is pending, the customer is redirected to the Success URL, otherwise (i.e. if the payment has been unsuccessful) they are redirected to your Failure URL.

Please note that a payment may have a status of pending in case the customer used an [asynchronous payment method](/payment-methods/#asynchronous-payments) (such as [alternative payment methods](/payment-methods/#local-payment-methods), which are asynchronous in principle), meaning that it may take up to several days to confirm whether the payment has been successful. You need to use [webhooks](/webhooks-for-payments) so that we inform you when the payment is confirmed as successful or failed.

Keep in mind that the Success URL and Failure URL are both specified within the payment source you have created (please refer to the [Before you start](#before-you-start) section above); these can be found in your viva banking app under the [payment sources](/getting-started/view-the-payment-source-list) for your website / app.

The redirection uses the HTTP GET method and appends the following query string parameters to the redirect Success / Failure URL:

-   **t** (uuid): The transaction ID (may not be returned for failed transactions). Example: `t=2b4c6b5b-49ff-4e46-adc5-f53740212361`.
-   **s** (int64): The unique 16-digit ID for the payment order. Example: `s=7680701046572600`.
-   **lang** (string): The language of the destination page in [ISO 639](https://www.iso.org/iso-639-language-codes.html) defined format. Example: `lang=en-GB`.
-   **eventId** (int32): Viva [Event ID](/integration-reference/response-codes/#event-id-codes) code. Example: `eventId=10051` (Insufficient funds).
-   **eci** (int32): [Electronic Commerce Indicator](/integration-reference/response-codes/#electronic-commerce-indicator), a value indicating the outcome of authentication attempted on transactions enforced by 3DS. Example: `eci=1` (Authenticated).

#### Step 4: Verify payment

You need to **_explicitly_** verify the payment status and not rely solely on whether your success or failure URL is called. This is particularly important if you offer [asynchronous payment methods](/payment-methods/#asynchronous-payments). Other factors, such as network connection issues and malicious hijacking attempts, can also necessitate verification.

Our recommended method for verification is using the **‘Transaction Payment Created’ webhook**. Alternatively, you can make an API call to _‘Retrieve Transaction’_ to verify the status of a specific payment. Both methods are outlined below.

##### Webhook (Transaction Payment Created) - **recommended**

You should use webhooks so that we can notify you when the payment is confirmed as successful or failed.

Regarding the Transaction Payment Created webhook, you should confirm the payment result with the combination of `OrderCode` and `TransactionId` parameters. You should then check the `StatusId` parameter to validate the status of the transaction and the `Amount` to validate the amount received, before updating a transaction’s status on your system. As an extra layer of confirmation, you have the option to use the [Retrieve Transaction](/apis-for-payments/payment-api/#tag/Transactions-\(Deprecated\)/paths/~1api~1transactions~1{transaction_id}/get) API (as outlined below)

Please see our [‘Transaction Payment Created’](/webhooks-for-payments/transaction-payment-created) and [‘Transaction Failed’](/webhooks-for-payments/transaction-failed/) documentation for further details.

##### API Call (Retrieve Transaction) - _alternative_

You can make a call to the Retrieve Transaction API in order to verify the status of a specific payment.

-   You should make the below call through a **backend channel**
-   You should use the [OAuth2](/integration-reference/oauth2-authentication/) method for authentication

Please see our [‘Retrieve Transaction’](/apis-for-payments/payment-api/#tag/Transactions/paths/~1checkout~1v2~1transactions~1{transactionId}/get) API documentation for further details.

You can also utilise our [‘Retrieve Order’](/apis-for-payments/payment-api/#tag/Payments/paths/~1api~1orders~1{orderCode}/get) API call to retrieve information about a specific order (even it has not yet been paid).

Request example

get    `/checkout/v2/transactions/{transactionId}`

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17199201-8ba0418e-ac11-4203-a11f-9a0e7db91648?action=collection%2Ffork&collection-url=entityId%3D17199201-8ba0418e-ac11-4203-a11f-9a0e7db91648%26entityType%3Dcollection%26workspaceId%3D71008394-7296-44d9-ad1c-ae1f239b5574)

Environment

URL

Production

https://api.vivapayments.com/checkout/v2/transactions/{transactionId}

Demo

https://demo-api.vivapayments.com/checkout/v2/transactions/{transactionId}

[cURL](#tab21) [PHP](#tab22)

```json
curl '[Environment URL]'
-H 'Authorization: Bearer [access token]' \
-H 'Content-Type: application/json' \
```

```php
<?php
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => '[Environment URL]',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer [access token]'
  ),
));
$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

Response example

```json
{
    "email": "someone@example.com",
    "amount": 30.00,
    "orderCode": 6962462482972601,
    "statusId": "F",
    "fullName": "George Seferis",
    "insDate": "2021-12-06T14:32:10.32+02:00",
    "cardNumber": "523929XXXXXX0168",
    "currencyCode": "978",
    "customerTrns": "Short description of items/services purchased to display to your customer",
    "merchantTrns": "Short description of items/services purchased by customer",
    "cardUniqueReference": "9521B4209B611B11E080964E09640F4EB3C3AA18",
    "transactionTypeId": 5,
    "recurringSupport": false,
    "totalInstallments": 0,
    "cardCountryCode": null,
    "cardIssuingBank": null,
    "currentInstallment": 0,
    "cardTypeId": 1
}
```

### Integrate a mobile app with Smart Checkout

In case you need to integrate a mobile app with Smart Checkout, the above steps are still applicable but you need to adopt a slightly adjusted integration approach. Keep in mind that you still need to create a payment order, and redirect the customer to Smart Checkout, and then handle the redirect back to you and verify the payment. Details on how to integrate a mobile app with Smart Checkout can be found [here](/tutorials/smart-checkout-configuration/integrate-with-a-mobile-app/).

### Go-Live

#### Pre-Go-Live Checklist

Please refer to the following checklist to ensure you have completed all necessary steps _before_ Go-Live.

-   **Set up your [payment methods](/payment-methods/) (please check to confirm which need to be _activated_ or _deactivated_ for your use cases)**
    -   Configure [digital wallets](/payment-methods/#digital-wallets)
    -   Configure [local payment methods](/payment-methods/#local-payment-methods)
    -   Configure [Direct Debit & other payment methods](/payment-methods/#direct-debit-other)
    -   Apply an additional 'Service fee' - if so desired - to be added on top of the order amount if the customer chooses to pay with specific payment methods (for payment methods that support a service fee). Refer to parameter \`paymentMethodFees\` of the '[Create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post)' API call
    -   [Display payment method icons or banners](#payment-method-messaging) throughout your online store to indicate the payment methods you offer, as this will increase conversion and average order values
  
-   **Handle redirections, responses and errors**
    -   Implement a [proper redirect](/smart-checkout/smart-checkout-integration/#step-2-redirect-the-customer-to-smart-checkout-to-pay-the-payment-order) (not using an iframe)
    -   Test your [success URL and failure URL](/smart-checkout/smart-checkout-integration/#step-3-confirm-the-payment-of-the-payment-order) and ensure they can handle the query parameters
    -   [Verify the payment](/smart-checkout/smart-checkout-integration/#step-4-verify-payment) and retrieve transaction details
    -   Log [EventId and X-Viva-CorrelationId](/integration-reference/debugging-errors/#x-viva-correlationid-and-x-viva-eventid) if you have an error
  
-   **Ensure [webhooks](/webhooks-for-payments/) are functioning correctly, especially if offering [asynchronous payments](/payment-methods/#asynchronous-payments)**
    -   Make sure you’ve defined an endpoint for the [Transaction Payment Created](/webhooks-for-payments/transaction-payment-created/) webhook
    -   Make sure you only allow VivaWallet IP addresses to access your webhook endpoints
    -   Make sure that you can receive and process a notification
  
-   **Use the following API parameters to improve conversion**
    -   `customerTrns` - description for the customer
    -   `email` - customer's email
    -   `fullName` - customer's name
    -   `requestLang` - customer's language
    -   `countryCode` - affects the payment methods that will be offered to the customer
  
-   **Ensure the following [API parameters](/apis-for-payments/payment-api/#tag/Payments) are used**
    
    -   `preauth` - if doing pre-authorizations (authorize now, capture later via app/API)
    -   `allowRecurring` - if doing recurring payments (fixed or variable amount)
    -   `maxInstallments` - if supporting installments (customer selects number of installments)
    -   `paymentNotification` - if doing payment notification (Viva sends email to customer)
    -   `tipAmount` - if supporting tip amount (included in amount paid by customer)
    -   `disableExactAmount` - if supporting open amount (the customer can specify what they pay)
    -   `paymentTimeout` - if you need to allow more than the default 30 minutes for your customer to pay
    -   `cardTokens` - if you need to save the card tokens of your customers in your merchant backend
    
      
    
-   **Configure customization options**
    
    -   Define your [logo](/smart-checkout/smart-checkout-functionality-options/#add-your-brand-logo), as it improves conversion
    -   Define your [brand color](/smart-checkout/smart-checkout-integration/#optional-but-recommended-specify-brand-color), as it improves conversion
    -   Define your [preselected payment method](/smart-checkout/smart-checkout-integration/#optional-specify-pre-selected-payment-method), if you prefer your customer to pay you with a specific payment method
    
      
    
-   **Check additional payment features**
    
    -   If using [recurring payments](/tutorials/payments/create-a-recurring-payment/), create a new payment from an initial payment
    -   If using [pre-authorized payments](/tutorials/payments/handle-pre-authorizations/), capture the pre-authorized payment via API
    -   If using [card installment payments](/tutorials/payments/handle-payments-with-card-installments/), create an additional test payment with installments
    -   If using merchant-side card tokenization, make sure you [handle card tokens](/tutorials/payments/handle-card-tokens/) properly
    
      
    
-   **You may use the following [API parameters](/apis-for-payments/payment-api/#tag/Payments) for reconciliation purposes**
    -   `phone` - customer's phone number
    -   `merchantTrns` - description for you
    -   `tags`

#### Go-Live Steps

Please use the following checklist to ensure you complete all necessary steps to Go-Live.

1.  **Register for a live Viva account**
    
    -   To do this, visit our [Open your account](https://app.vivawallet.com) page
    
      
    
2.  **Set up a payment source in your production account**
    
    -   Visit [Create a live payment source](/getting-started/create-a-payment-source) to find out how to do this
    
      
    
3.  **Authenticate using production credentials**
    
    -   See [OAuth2](/integration-reference/oauth2-authentication/) authentication method for further details
    
      
    
4.  **Update base URLs to live**
    
    -   Replace `demo.vivapayments.com` with `www.vivapayments.com` in your code
    
      
    
5.  **Final live testing with a real payment card**
    -   Make a test purchase for a small amount using a [supported card](/payment-methods/#cards). Afterwards, you can cancel the transaction from your Viva account

### Additional use cases

#### Recurring payments

If the payment is initiated by you (the merchant), without the involvement of the customer, you should use **recurring payments**, rather than one-off payments.

-   Note: the first payment requires customer involvement
-   [Use case (merchant): charge automatically a bill or a subscription, on a regular or non-regular schedule](/payment-tools/subscriptions/)
-   Check out the following tutorial for more details: [**Create a recurring payment**](/tutorials/payments/create-a-recurring-payment/)

#### Pre-authorizations

If the transfer of funds is to be initiated later, but you now want to ensure the customer has the required funds and in fact reserve these funds, you should use a **pre-authorization**, rather than a direct charge.

-   Use cases (customer): make a reservation (e.g. hotel), place a pre-order, and so on
-   Use cases (merchant): place a hold on the funds until the order is shipped, and so on
-   Check out the following tutorial for more details: [**Handle pre-authorizations**](/tutorials/payments/handle-pre-authorizations/)

### Further Information

Check out the following tutorials for more details about some of the above topics:

-   [Use OAuth 2.0 authentication](/tutorials-for-payments/enable-oauth2-authentication/)
-   [Create a payment order](/tutorials/create-a-payment-order)
-   [Create a recurring payment](/tutorials/create-a-recurring-payment)
-   [Verify a payment](/tutorials-for-payments/verify-a-payment)
-   [Set webhook to confirm payment](/tutorials/set-webhook-to-confirm-payment)
-   [Issue refunds via banking app or API](/tutorials-for-payments/issue-refunds-via-banking-app-or-api)
-   [Handle pre-authorizations](/tutorials-for-payments/handle-pre-authorizations)
-   [Integrate with a mobile app](/tutorials-for-payments/mobile-app-integration/)
-   [Add your brand logo](/tutorials/smart-checkout-configuration/add-your-brand-logo/)
-   [Collect payments with QR codes](/tutorials/payments/collect-payments-with-qr-code/)
-   [Find transaction IDs](/tutorials/general/find-transaction-ids/)
-   [Set your desired payment method](/tutorials/payments/set-your-desired-payment-method/)
-   [Handle payments with card installments](/tutorials/payments/handle-payments-with-card-installments/)
-   [Handle Card Tokens](/tutorials/payments/handle-card-tokens/)

### Get Support

If you would like to integrate with Viva, or if you have any queries about our products and solutions, please see our [**Contact & Support**](/get-support) page to see how we can help!