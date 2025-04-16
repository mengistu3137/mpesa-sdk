# Mpesa SDK for JavaScript/TypeScript

A flexible and versatile SDK to integrate with the Safaricom M-Pesa API. 
Built with TypeScript, it offers excellent type safety and developer experience for both JavaScript(node js) and TypeScript projects.

**Key Features:**

* **Flexible Environment:** Works seamlessly in both **browser** and **Node.js** environments.
* **CommonJS and ES Modules:** Can be consumed in both **CommonJS** (`require`) and **ES Modules** (`import`) projects.
* **TypeScript First:** Developed with **TypeScript**, providing strong typing and excellent IDE support.
* **Comprehensive API Coverage:** Supports key M-Pesa API functionalities:
    * **STK Push:** Initiate Lipa Na M-Pesa online payments.
    * **Register URL:** Register callback URLs for C2B transactions.
    * **C2B:** Simulate Customer to Business transactions.
    * **B2C:** Disburse funds from Business to Customer.
    * **Transaction Status:** Query the status of M-Pesa transactions.
    * **Account Balance:** Check the balance of M-Pesa accounts.
    * **Reversal:** Reverse M-Pesa transactions.
* **Simplified Authentication:** Handles the complexities of M-Pesa API authentication, allowing you to focus on your application logic.
* **Promise-Based:** Utilizes Promises for asynchronous operations, making your code clean and easy to manage.
* **Well-Structured:** Organized into logical resource modules for easy access to specific API functionalities.

**Installation:**

You can install the SDK using npm or yarn:

```bash
npm install mpesa-sdk

### Example Usage

Here's a basic example demonstrating how to initialize the SDK, obtain an access token, register C2B URLs, and initiate an STK Push transaction. This example is compatible with both TypeScript and JavaScript projects.

```typescript/javascript
import { MpesaSDK } from 'mpesa-sdk';

// Replace with your actual consumer key and secret obtained from the M-Pesa developer portal
const consumerKey = 'YOUR_CONSUMER_KEY';
const consumerSecret = 'YOUR_CONSUMER_SECRET';

// Replace with your actual sandbox details
const shortCode = 'YOUR_SHORTCODE'; // Your Paybill or Till Number (e.g., '802000' for C2B registration)
const confirmationURL = '[https://example.com/confirmation](https://example.com/confirmation)'; // Your publicly accessible confirmation URL
const validationURL = '[https://example.com/validation](https://example.com/validation)';   // Your publicly accessible validation URL
const businessShortcode = 'YOUR_BUSINESS_SHORTCODE'; // Your Lipa Na M-Pesa Online shortcode (e.g., '174379')
const passkey = 'YOUR_PASSKEY';       // Your Lipa Na M-Pesa Online passkey
const phoneNumber = '2517XXXXXXXX';   // Customer's M-Pesa registered phone number (in international format: 2517...)
const callbackURL = '[https://example.com/callback](https://example.com/callback)';   // Your publicly accessible callback URL for STK Push

async function main() {
  const mpesa = new MpesaSDK({ consumerKey, consumerSecret });

  try {
    // 1. Obtain an Access Token
    const accessToken = await mpesa.getToken();
    console.log('Access Token:', accessToken);

    // 2. Register C2B Callback URLs
    console.log('\n--- Registering C2B URLs ---');
    const registerURLResponse = await mpesa.registerURL.register({
      ShortCode: shortCode,
      ResponseType: 'Completed', // Or 'Cancelled'
      ConfirmationURL: confirmationURL,
      ValidationURL: validationURL,
    });
    console.log('Register URL Response:', registerURLResponse);

    // 3. Initiate an STK Push Transaction
    console.log('\n--- Initiating STK Push ---');
    const timestamp = mpesa.formatTimestamp();
    const password = mpesa.generateSTKPushPassword(businessShortcode, passkey, timestamp);

    const stkPushResponse = await mpesa.stkPush.send({
      MerchantRequestID: `YOUR_PARTNER_NAME-${Date.now()}`, // Replace with your unique identifier
      BusinessShortCode: businessShortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: 10, // Example amount
      PartyA: phoneNumber,
      PartyB: businessShortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackURL,
      AccountReference: 'Test Payment',
      TransactionDesc: 'Payment for goods',
    });
    console.log('STK Push Response:', stkPushResponse);

    // You can add more examples here for other API functionalities like B2C, Transaction Status, etc.

  } catch (error) {
    console.error('Error:', error);
  }
}

main();