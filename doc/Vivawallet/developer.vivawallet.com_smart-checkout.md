# Smart Checkout

##### Smart Checkout is a **hosted payment page** which gets **smarter over time**. It is fast to integrate, offers increased conversion, and is continually self-updated.

-   [Overview](#overview)
    -   [Features](#features)
    -   [User experience](#user-experience)
        -   [Screenshots](#screenshots)
        -   [Videos](#videos)
    -   [Supported payment methods](#supported-payment-methods)
-   [Integration guide](#integration-guide)
-   [Functionality & options](#functionality-options)
-   [Frequently Asked Questions](#frequently-asked-questions)
-   [Demo payment pages](#demo-payment-pages)
-   [Get Support](#get-support)

### Overview

Smart Checkout is a turn-key solution for merchants to integrate with Viva to accept payments via an online store. It involves minimal effort on your side and offers the widest variety of payment options and overall features. When your customer is ready to make a payment, you direct them to a payment page hosted by Viva, where the customer provides their payment details and makes the payment. When the payment is completed, they are redirected back to a success (thank you) page of your choice.

**Please see our video overview of Smart Checkout’s main features and benefits:**  
  
 Your browser does not support the video tag.  

Smart Checkout exhibits **high performance**: the customers of our merchant clients that use Smart Checkout proceed to pay on an average rate of **87.6% across Europe** (that number is even higher in certain countries, like the UK, where it sits at 91.1%). That number climbs even higher, to **97.2% for customers that have saved their card on Smart Checkout**.

Smart Checkout **future-proofs your payments** as it is constantly self-updated, with no coding required from you, to offer a) additional payment methods as they grow in popularity, b) constant improvements to customer experience and thus conversion, and c) constant regulatory compliance to ever-changing regulatory requirements

#### Features

Smart Checkout offers the widest variety of **overall features:**

-   **Simple integration**: minimal effort required to integrate, with all features enabled out of the box without additional coding from you
-   **Increased conversion**: dynamically orders payment methods based on the location of the customer, prioritising the most popular local options, thereby increasing conversion rates
-   **Customer preferences**: remembers past payment behavior and preferences of the customer across merchants and countries
-   **Saved cards (customer-side)**: customers can pay using cards they have saved during past purchases, even from other merchants; thus, saved cards are available even to first-time customers. The customer does not need to create an account to save a card or re-use saved cards. New merchants take advantage of the pool of already saved cards across the Viva ecosystem
-   **Card tokenization (merchant-side)**: the merchant can save the card tokens of their customers in the merchant backend, and then use the saved card tokens when the merchant will redirect their customers to Smart Checkout again in the future. The saved card tokens provided by the merchant will then be presented to the customer on Smart Checkout to use and pay with
-   **Decline recovery:** based on the customer’s past payment behavior, we prompt the customer to re-try a declined payment
-   **Recurring payments**: charge the customer automatically, for a fixed or variable amount, on a regular or non-regular schedule
-   **Dynamic descriptor**: Employ dynamic descriptior for payments, so the buyers can recognize transactions clearly on both bank statements and 3DS verification pages.
    -   **Dynamic Currency Conversion**: [This service](/smart-checkout/smart-checkout-dynamic-currency-conversion/) lets your international customers see prices in their own home currency right at the checkout.
-   **Pre-authorizations**: the merchant can reserve funds now and conclude the payment later (i.e. ‘authorize’ now and ‘capture’ later)
-   **Payment method customization**: switch payment methods on/off at any time, specify order of appearance of payment methods, and specify preferred payment method
-   **Mobile-optimized**: offer an optimized browsing experience on any device (mobile, tablet, laptop, or desktop)
-   **Local languages & currencies**: current support for 17 languages (English, German, French, Italian, Spanish, Polish, Romanian, Dutch, Greek, Czech, Portuguese, Swedish, Hungarian, Bulgarian, Danish, Finnish, and Croatian), and 9 currencies (BGN (Bulgarian lev), CZK (Czech koruna), DKK (Danish krone), EUR (Euro), GBP (Pound sterling),HUF (Hungarian forint), PLN (Polish złoty), RON (Romanian leu) & SEK (Swedish krona))
-   **Cross-border payments**: Supported for all payment methods; you can accept payments from international customers for all payment methods, provided you indicate the country of the customer (use the countryCode parameter of the Create payment order API call)
-   **Cross-currency payments**: Merchants can provide product prices in [different currencies](/smart-checkout/smart-checkout-multicurrency/) than the currency of the country to which they are registered
-   **Branding**: allow customization of the look and feel of your checkout page through a graphical user interface
-   **Compliance & security**: full PCI & SCA/[3DS](https://www.emvco.com/processes-forms/product-approval/authentication/3ds/) support utilizing SCA exemptions, along with advanced fraud protection using Machine Learning algorithms
-   **Constantly self-updated**: regular self-updates with no coding required from you, to; a) offer new payment methods, b) offer new conversion-improving features, and c) comply with all the latest regulatory and security requirements
-   **Card Verification**: the ability to create zero-amount payment orders for the purposes of verifying a customer’s card without needing to take any payment

**Smart Checkout is preferable to an API-based checkout** (i.e. a checkout you need to build yourself for your online store by integrating with APIs offered by several different payment providers in order to offer all payment methods) for multiple reasons:

1.  It requires **minimal effort** to integrate and offer all out-of-the-box features & payment methods, such as:  
    a. Handling of SCA/ 3DS, including soft declines when low-risk exemptions are enabled  
    b. Support for saved cards across merchants, even for first-time customers, with no customer account required  
    c. Support for merchant-side card tokenization, so that merchants can save the card tokens of their customers  
    d. Performs decline recovery to further improve conversion **+1.6% to conversion rate**  
    e. Multiple payment methods, e.g. Apple Pay, PayPal, Klarna, via a single integration  
    f. Enhanced user experience, boosting conversion rates and customer satisfaction  
    g. Support for 17 local languages  
    
2.  It requires **no effort to always have updated**, as Viva deals on an ongoing basis with enhancements to:  
    a. Offer new features that further enhance customer experience and conversion rates  
    b. Provide additional payment methods as they are introduced and grow in popularity  
    c. Continuously comply with ever-changing regulatory requirements  
    
3.  It offers **unique features that an API-based checkout cannot offer across merchants & countries**:  
    a. Customers can use cards they have saved during past purchases from other merchants **+6% to conversion rate**  
    b. Customers are presented payment methods most likely to convert based on past overall behavior (considering all purchases from all merchants across countries) (coming soon)
    
4.  It offers **payment methods not available via an API-based checkout**, such as PayPal (wallet), Klarna, and others
    
5.  Nowadays, **55% of consumers in Europe pay with a method other than card**, and this continues to grow
    
6.  It offers **out-of-the-box PCI-DSS & SCA/3DS compliance** as Viva (not the merchant) manages sensitive customer data and adherence to industry security standards
    

#### User experience

##### Screenshots

With our Smart Checkout solution, customers are redirected to the Viva Smart Checkout payment page to make a payment. The below image shows how a Smart Checkout payment page displays to your customers:  

![Smart Checkout](/images/sc-new-general.png?width=600px&height=auto&classes=border)

##### Videos

The below video shows some features of **Smart Checkout** payment page:

 Your browser does not support the video tag.

#### Supported payment methods

Smart Checkout supports a wide variety of payment methods, including:

-   [**Cards**](/payment-methods/#cards) (Visa, Mastercard, American Express, Maestro, Bancontact, JCB, Discover & Diners Club)
-   [**Digital wallets**](/payment-methods/#digital-wallets) (Apple Pay, Google Pay, Samsung Pay, PayPal, PayPal Pay Later, Viva Wallet & MobilePay Online)
-   [**Local payment methods**](/payment-methods/#local-payment-methods) (BANCOMAT Pay, Bancontact QR, BitPay, BLIK, Bluecode, EPS, iDEAL, IRIS, Klarna, MULTIBANCO, MB WAY, P24, Payconiq, PayU, Satispay, Swish, tbi bank, Trustly & WeChat Pay)
-   [**Direct Debit & other payment methods**](/payment-methods/#direct-debit-other) (Pay By Bank, Cash (Viva Spot) & e-banking (ΔΙΑΣ/DIAS))

![Visa](/images/new-payment-methods-logos/visa_updated_1.svg?width=50px&height=auto)

![Mastercard](/images/new-payment-methods-logos/mastercard.svg?width=50px&height=auto)

![American Express](/images/new-payment-methods-logos/american-express.svg?width=45px&height=auto)

![Maestro](/images/new-payment-methods-logos/maestro.svg?width=50px&height=auto)

![Bancontact](/images/new-payment-methods-logos/bancontact.svg?width=50px&height=auto)

![JCB](/images/new-payment-methods-logos/jcb.svg?width=50px&height=auto)

![Discover](/images/new-payment-methods-logos/discover.svg?width=50px&height=auto)

![Diners Club](/images/new-payment-methods-logos/diners-club.svg?width=50px&height=auto)

![Apple Pay](/images/new-payment-methods-logos/applepay.svg?width=50px&height=auto)

![Google Pay](/images/new-payment-methods-logos/googlepay.svg?width=55px&height=auto)

![Samsung Pay](/images/new-payment-methods-logos/samsungpay.svg?width=55px&height=auto)

![PayPal](/images/new-payment-methods-logos/paypal.svg?width=55px&height=auto)

![PayPal Pay Later](/images/new-payment-methods-logos/paypalpaylater.png?width=50px&height=auto)

![Viva Wallet](/images/pay-with-viva-wallet-logo.png?width=45px&height=auto)

![MobilePay Online](/images/new-payment-methods-logos/mobilepay-online.svg?width=70px&height=auto)

![BANCOMAT Pay](/images/new-payment-methods-logos/bancomatpay.png?width=70px&height=auto)

![BitPay](/images/new-payment-methods-logos/bitpay_updated_1.svg?width=50px&height=auto)

![BLIK](/images/new-payment-methods-logos/blik.svg?width=50px&height=auto)

![Bluecode](/images/new-payment-methods-logos/bluecode_logo_web_blue.svg?width=50px&height=auto)

![EPS](/images/new-payment-methods-logos/eps.svg?width=50px&height=auto)

![Pay on Delivery](/images/new-payment-methods-logos/payondelivery.svg?width=45px&height=auto)

![iDEAL](/images/new-payment-methods-logos/ideal.svg?width=50px&height=auto)

![IRIS](/images/new-payment-methods-logos/iris.svg?width=50px&height=auto)

![Klarna](/images/new-payment-methods-logos/klarna.svg?width=50px&height=auto)

![MULTIBANCO](/images/new-payment-methods-logos/multibanco.svg?width=50px&height=auto)

![MB WAY](/images/new-payment-methods-logos/mbway.svg?width=50px&height=auto)

![P24](/images/new-payment-methods-logos/p24_updated_1.svg?width=50px&height=auto)

![Payconiq](/images/new-payment-methods-logos/payconiq.svg?width=65px&height=auto)

![PayU](/images/new-payment-methods-logos/payu.svg?width=50px&height=auto)

![Swish](/images/new-payment-methods-logos/swish.svg?width=55px&height=auto)

![tbi bank](/images/new-payment-methods-logos/tbibank.svg?width=50px&height=auto)

![Trustly](/images/new-payment-methods-logos/trustly.svg?width=50px&height=auto)

![Satispay](/images/new-payment-methods-logos/satispay.svg?width=45px&height=auto)

![WeChat Pay](/images/new-payment-methods-logos/wechatpay.svg?width=55px&height=auto)

![Pay By Bank](/images/new-payment-methods-logos/onlinebanking.svg?width=45px&height=auto)

![Cash (Viva Spot)](/images/new-payment-methods-logos/cash.svg?width=45px&height=auto)

.pmtable tr {border-style : hidden!important;} .pmtable td {border-style : hidden!important;}

Please see our [**Payment Methods**](/payment-methods/) page for further information on **all** of our payment methods

**Cross-border payments**: Supported for all payment methods; you can accept payments from international customers for all payment methods, provided you indicate the country of the customer (use the countryCode parameter of the [**Create payment order**](/apis-for-payments/payment-api/#tag/Payments/paths/~1checkout~1v2~1orders/post) API call)

### Integration guide

Here is our [**integration guide**](/smart-checkout/smart-checkout-integration) covering the process to integrate Smart Checkout with your online store.

### Functionality & options

Here are details of the [**functionality & options**](/smart-checkout/smart-checkout-functionality-options) offered by Smart Checkout, including the additional configuration choices available.

### Frequently Asked Questions

Here are our [**frequently asked questions (_FAQs_)**](/smart-checkout/smart-checkout-faqs) surrounding the integration, configuration, and use of Smart Checkout.

### Demo payment pages

Please find, below, demo pages for each available country. You can use these as illustrations of how the Smart Checkout payment page looks and functions.

You can use our [test payment cards](https://developer.viva.com/integration-reference/test-cards-and-environments/#test-cards) in order to test making payments.

   

Country

Demo Payment Page

Country

Demo Payment Page

![Austria](/images/new-country-flags/austria.png)

[**Austria**](https://demo.vivapayments.com/web/checkout?ref=5622260841912453&color=ed2939)

![Ireland](/images/new-country-flags/ireland.png)

[**Ireland**](https://demo.vivapayments.com/web/checkout?ref=9122279503285679&color=169b62)

![Belgium](/images/new-country-flags/belgium.png)

[**Belgium**](https://demo.vivapayments.com/web/checkout?ref=4914898586096999&color=a31510)

![Italy](/images/new-country-flags/italy.png)

[**Italy**](https://demo.vivapayments.com/web/checkout?ref=8314903723444436&color=ce3737)

![Bulgaria](/images/new-country-flags/bulgaria.png)

[**Bulgaria**](https://demo.vivapayments.com/web/checkout?ref=7714947981000453&color=48956d)

![Luxembourg](/images/new-country-flags/luxembourg.png)

[**Luxembourg**](https://demo.vivapayments.com/web/checkout?ref=1122286012049472&color=01a1de)

![Croatia](/images/new-country-flags/croatia.png)

[**Croatia**](https://demo.vivapayments.com/web/checkout?ref=9364222139576597&color=ff0000)

![Malta](/images/new-country-flags/malta.png)

[**Malta**](https://demo.vivapayments.com/web/checkout?ref=9528022556172607&color=ce132a)

![Cyprus](/images/new-country-flags/cyprus.png)

[**Cyprus**](https://demo.vivapayments.com/web/checkout?ref=5522243373579129&color=d5791a)

![Netherlands](/images/new-country-flags/netherlands.png)

[**Netherlands**](https://demo.vivapayments.com/web/checkout?ref=9014967057693398&color=ae1c28)

![Czech Republic](/images/new-country-flags/czechrepublic.png)

[**Czech Republic**](https://demo.vivapayments.com/web/checkout?ref=9914976727974380&color=3bb82e)

![Poland](/images/new-country-flags/poland.png)

[**Poland**](https://demo.vivapayments.com/web/checkout?ref=8514887648364679&color=dc143c)

![Denmark](/images/new-country-flags/denmark.png)

[**Denmark**](https://demo.vivapayments.com/web/checkout?ref=6608758359360693&color=c60c2f)

![Portugal](/images/new-country-flags/portugal.png)

[**Portugal**](https://demo.vivapayments.com/web/checkout?ref=6214934910622109&color=336704)

![Finland](/images/new-country-flags/finland.png)

[**Finland**](https://demo.vivapayments.com/web/checkout?ref=8108774203812002&color=003580)

![Romania](/images/new-country-flags/romania.png)

[**Romania**](https://demo.vivapayments.com/web/checkout?ref=5614954144471036&color=002b7f)

![France](/images/new-country-flags/france.png)

[**France**](https://demo.vivapayments.com/web/checkout?ref=6514958079168217&color=043295)

![Spain](/images/new-country-flags/spain.png)

[**Spain**](https://demo.vivapayments.com/web/checkout?ref=2014980504588535&color=c7342a)

![Germany](/images/new-country-flags/germany.png)

[**Germany**](https://demo.vivapayments.com/web/checkout?ref=8789281975921273&color=de3b30)

![Sweden](/images/new-country-flags/sweden.png)

[**Sweden**](https://demo.vivapayments.com/web/checkout?ref=3789230317198565&color=2167a2)

![Greece](/images/new-country-flags/greece.png)

[**Greece**](https://demo.vivapayments.com/web/checkout?ref=5617245978572605&color=3171b8)

![United Kingdom](/images/new-country-flags/unitedkingdom.png)

[**United Kingdom**](https://demo.vivapayments.com/web/checkout?ref=3114853442385879&color=c50c26)

![Hungary](/images/new-country-flags/hungary.png)

[**Hungary**](https://demo.vivapayments.com/web/checkout?ref=3109879395972644&color=477050)

### Get Support

If you would like to integrate with Viva, or if you have any queries about our products and solutions, please see our [**Contact & Support**](/get-support) page to see how we can help!