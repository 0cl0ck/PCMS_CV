# Functionality & Options

##### An overview of the key **functionality & options** offered by Smart Checkout.

- [Styling & design](#styling-design)
- [Checkout language](#checkout-language)
- [Save payment cards for future use](#save-payment-cards-for-future-use)
  - [Customer-side card tokenization](#customer-side-card-tokenization)
  - [Mastercard Click to Pay](#mastercard-click-to-pay)
- [Decline recovery](#decline-recovery)
- [Field validation](#field-validation)
- [Form auto-complete](#form-auto-complete)
- [Automatic card logo display](#automatic-card-logo-display)
- [3DS challenge flow](#3ds-challenge-flow)
- [Dynamic Descriptor](#dynamic-descriptor)
- [Payment order expiry](#payment-order-expiry)
- [Pre-authorizations](#pre-authorizations)
- [Pay by card installments](#pay-by-card-installments)
- [Recurring payments](#recurring-payments)
- [Get Support](#get-support)

### Styling & design

##### Add your brand logo

We would highly recommend you show your company logo on your Smart Checkout payment pages in order to increase customer recognition and trust, thus improving conversion. You can insert your company logo while [creating a payment source](/getting-started/create-a-payment-source/payment-source-for-online-payments/) for Smart Checkout.

You can also change or update this logo at any time, for any given payment source. To do this, please see our [adding your brand logo](/tutorials-for-payments/adding-your-brand-logo/) tutorial for a step-by-step guide.

##### Add your brand color

You can also add your preferred brand color to your Smart Checkout payment pages in the form of a URL parameter. Please see the [specify brand color](/smart-checkout/smart-checkout-integration#optional-but-recommended-specify-brand-color) section of our Smart Checkout Integration guide for further information.

##### Display a cancel button on Smart Checkout

When you activate the cancel button on Smart Checkout, your customers will have the ability to cancel their orders directly from the Smart Checkout. Please see the [display a cancel button on Smart Checkout](/smart-checkout/smart-checkout-integration/#optional-display-a-cancel-button-on-smart-checkout) section for further information.

### Checkout language

The language that Smart Checkout is presented in is determined according to this sequence:

1.  Language specified as a query parameter during the redirect by the merchant
2.  Language selected by the customer during a previous checkout
3.  Language specified during the creation of the payment order by the merchant
4.  Dominant language in the customer country

### Save payment cards for future use

Smart Checkout offers the ability for the customer to save their payment cards and reuse them while on Smart Checkout across merchants and countries. Customers can save cards once, and use everywhere.

The merchant is not involved in this process; in fact, you will not even be aware that your customers are using a saved card. In technical terms, this means that you will not receive any card tokens yourself; the card token will remain on the browser of the customer.

There are two ways to save payment cards:

- [Customer-side card tokenization](#customer-side-card-tokenization)
- [Mastercard Click to Pay](#mastercard-click-to-pay)

#### Customer-side card tokenization

This allows the customer to save any payment card, directly within their browser in the form of a cookie.

- [Saving a card](#saving-a-card): the customer will be offered the option to save a card and assign a friendly name
- [Paying with a saved card](#paying-with-a-saved-card): the customer can select a saved card to pay; they will be required to provide the CVV to use it (to ensure SCA)
- [Editing or deleting a saved card](#editing-or-deleting-a-saved-card): the customer can delete a saved card, or change the friendly name assigned to the saved card

##### Saving a card

The customer is able to save their card details during payment, as shown below:

![Smart Checkout - saving a card](/images/sc-new-savecard.png?width=600px)

##### Paying with a saved card

When paying, the customer is able to select which of their saved cards to use:

![Smart Checkout - paying with a saved card](/images/sc-new-paywithsavedcard.png?width=600px)

##### Editing or deleting a saved card

If desired, the customer can click on the edit (pencil) icon to edit or delete a saved card:

![Smart Checkout - editing or deleting a saved card](/images/sc-new-editsavedcard-1.png?width=600px)

From here, the customer can either:

- **`(1)`** rename the saved card before clicking the tick button to save it
- **`(2)`** delete the saved card

![Smart Checkout - editing a saved card](/images/sc-new-editsavedcard-2.png?width=300px)

When attempting to delete a saved card, a prompt will be shown, asking the customer to either cancel or complete the deletion:

![Smart Checkout - deleting a saved card](/images/sc-new-editsavedcard-3.png?width=300px)

#### Mastercard Click to Pay

Mastercard’s ‘Click to Pay’ functionality allows customers to save an eligible Mastercard payment card within their account, allowing for faster and easier use across merchants as well as across devices.

**\-** This functionality is currently only available in _Belgium_, with more countries to be supported soon  
**\-** _No_ activation is required - this functionality is available by default

- [New users](#new-users)
- [Returning users (without a cookie)](#returning-users-without-a-cookie)
- [Returning users (with a cookie)](#returning-users-with-a-cookie)

##### New users

New users (i.e. customers who have not utilised Mastercard Click to Pay previously) can start using this functionality by entering the details of a valid Mastercard payment card, before reviewing the Click to Pay disclosure at the bottom of the Smart Checkout page, and then selecting the relevant checkbox before proceeding.

![Mastercard Click to Pay 1](/images/mastercard_c2p_addcard_updated.png?width=250px)

The customer can then fill in their details, including name and phone number to complete the process. They will also be prompted to save their cards via a browser cookie for even faster use next time.

#### Returning users (without a cookie)

Customers who _have_ used Mastercard Click to Pay previously, but have _not_ saved the cards within their browser for future use (via a cookie) will be prompted to authenticate via a One-Time Passcode (OTP) to access their Mastercard Click to Pay cards:

![Mastercard Click to Pay 2](/images/mastercard_c2p_signin1_updated.png?width=250px)

If needed, another authentication method can be used:

![Mastercard Click to Pay 3](/images/mastercard_c2p_signin2_updated.png?width=250px)

#### Returning users (with a cookie)

Customers who have opted to save their cards via a browser cookie will be shown their saved cards right away:

![Mastercard Click to Pay 4](/images/mastercard_c2p_savedcards_updated.png?width=250px)

### Decline recovery

When a payment is declined, if certain criteria are satisfied, then we prompt the customer to try again with either the same payment method or with a different payment method.

The criteria examined to trigger the decline recovery will be constantly fine-tuned going forward to ensure ever-improving results.

By performing decline recovery, the conversion rate improves, with a significant portion of recovered declines resulting in a successful payment.

This feature is automatically enabled for all merchants, and thus merchants do not need to do anything, on their online store or to their integration with us, to take advantage of this new conversion-improving feature.

Your browser does not support the video tag.

### Field validation

There are two categories of validation available on Smart Checkout, **Inline** and **On Submit**, as described below:

![Smart Checkout - field validation](/images/sc-new-fieldvalidation.png?width=600px)

##### Inline validation

This type of validation occurs instantly as the customer moves between fields, but only if text has been entered.

- **Email address** — has to be a valid email address
- **Card number** — has to be a valid card number
- **Expiration date** — past dates are not allowed
- **CVV** — is required for all cards except for _Bancontact_ cards. If the customer has provided an _AMEX_ card, the CVV has to be four digits long, otherwise it has to be three digits long
- **Amount** (if editable by the customer, i.e. for [**Quick Pay**](/payment-tools/quick-pay)) — has to be a valid amount, greater than zero
- **Cardholder name** — has to be more than one character long

##### On Submit validation

This type of validation occurs once the customer has clicked on the button to make the payment.

- **All mandatory fields** must be filled (cannot remain blank)

### Form auto-complete

Smart Checkout allows the customer to auto-complete their card details if this functionality is supported by their browser. In such cases, the customer can select the desired payment card from a dropdown and the form will be completed with the respective card details.

### Automatic card logo display

The card logo is displayed once the customer has started entering the card number. For most cards, only two digits are necessary before the card is identified and the card logo is shown. _Maestro_ and _Bancontact_ are exceptions, with three and four digits required respectively before this will occur.

### 3DS challenge flow

The card issuer may choose to initiate a **3DS** (_3D Secure_) challenge. In such a case, the issuer requires additional customer interaction, either through biometrics, two-factor authentication, or similar methods.

### Dynamic Descriptor

Assign a descriptor tailored to the transaction, ensuring clarity and recognition for the buyer on their bank statement and 3DS verification page. This functionality allows you to generates a dynamic descriptor for bank statements when processing a payment through smart checkout.

### Payment order expiry

If the customer is unable to make a payment because the checkout process has expired, then the customer should go back the merchant store and restart the checkout process. The `paymentTimeout` parameter can be used to set the expiry time when [creating a payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post)

### Pre-authorizations

Pre-authorization (_pre-auth_) transactions with a debit card or credit card hold the balance as unavailable either until the merchant ‘captures’ the transaction or the hold ‘falls off’. The latter is automatically done after a certain period, at which point the pre-authorization is ‘lost’ and can no longer be captured.

A pre-authorization is enabled if the following condition is met:

- The `isPreAuth` request body parameter within the [create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post) API call is set to `true`

**More information on handling pre-authorizations (including creating, capturing and cancelling) can be found on our [tutorial page](/tutorials-for-payments/handle-pre-authorizations/).**

Pre-authorizations are not available with [recurring payments](/tutorials-for-payments/create-a-recurring-payment) or [card installments](/tutorials/payments/handle-payments-with-installments/)

### Pay by card installments

The option to pay by card installments is enabled if the following three conditions are met:

- The `maxInstallments` request body parameter within the [Create payment order](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post) API call is set to greater than `1` and up to `36`
- The merchant account is Greek and set up in Greece. Accounts originating in other countries do not support this
- The customer’s card supports installments

**Please note**: If offering installments, the value provided by the merchant is _not_ the number of installments the customer will select, and it is _not_ mandatory for the customer to select installments at all. The process is as follows:

1.  The merchant indicates the **maximum** number of installments they wish to offer to the customer
2.  It is then **up to the customer** whether they pay with or without installments
3.  If the customer decides to pay with installments, they are able to select the **number** of installments (_up to the maximum specified by the merchant_)

#### Forcing installments

The merchant also has the option to _force_ a specific number of installments on a payment order by using the `forceMaxInstallments` parameter and setting it to `true`. When used, please note that the following conditions apply:

1.  It is mandatory for the customer to pay with installments _and_ with the specific number indicated
2.  Only cards supporting installments can be used for the payment
3.  The value set within the `maxInstallments` parameter dictates the number of installments that will be forced to the customer. It should be **\>**`0`, otherwise the call will return an error

**More information on payment by card installments can be found on our [tutorial page](/tutorials/payments/handle-payments-with-installments/).**

Card installments are not available with [recurring payments](/tutorials-for-payments/create-a-recurring-payment) or [pre-authorizations](/tutorials-for-payments/handle-pre-authorizations/)

### Recurring payments

A recurring payment A.K.A. a subscription is initiated by the merchant without the involvement or presence of the customer (no _3DS_ authentication is required), done on a regular or non-regular schedule, for a fixed or variable amount. This requires an initial payment to be made with the involvement of the customer, during which the customer provides consent to the merchant to make future automatic payments (recurring payments). Recurring payments can be created via API and from within the Viva account (self-care).

**More information on recurring payments/subscriptions can be found on our [tutorial page](/tutorials-for-payments/create-a-recurring-payment) and [payment tools page](/payment-tools/subscriptions/).**

Recurring payments are not available with [card installments](/tutorials/payments/handle-payments-with-installments/) or [pre-authorizations](/tutorials-for-payments/handle-pre-authorizations/)

### Get Support

If you would like to integrate with Viva, or if you have any queries about our products and solutions, please see our [**Contact & Support**](/get-support) page to see how we can help!
