interface CreatePaymentRequest {
  amount: number;
  customerTrns: string;
  customer: {
    email: string;
    fullName: string;
    phone: string;
    countryCode: string;
    requestLang: string;
  };
  paymentTimeout: number;
  sourceCode: string;
  merchantTrns?: string;
  allowRecurring?: boolean;
  maxInstallments?: number;
  paymentNotification?: string;
  tipAmount?: number;
  disableExactAmount?: boolean;
  disableCash?: boolean;
  disableWallet?: boolean;
  redirectUrl: string;
  cancelUrl: string;
}

interface PaymentResponse {
  orderCode: string;
  smartCheckoutUrl: string;
}

export class VivaWalletService {
  private static readonly BASE_URL =
    process.env.VIVA_WALLET_BASE_URL || 'https://api.vivapayments.com';
  private static readonly AUTH_URL =
    process.env.VIVA_WALLET_AUTH_URL || 'https://accounts.vivapayments.com/connect/token';
  private static readonly CLIENT_ID = process.env.VIVA_WALLET_CLIENT_ID;
  private static readonly CLIENT_SECRET = process.env.VIVA_WALLET_CLIENT_SECRET;
  private static readonly SOURCE_CODE = process.env.VIVA_WALLET_SOURCE_CODE;
  private static readonly BASE_APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || 'https://chanvre-vert.vercel.app';

  private static async getAccessToken(): Promise<{
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  }> {
    console.log('Getting access token with credentials:', {
      clientId: this.CLIENT_ID ? '***' : 'missing',
      clientSecret: this.CLIENT_SECRET ? '***' : 'missing',
    });

    if (!this.CLIENT_ID || !this.CLIENT_SECRET) {
      throw new Error('Missing Viva Wallet OAuth credentials');
    }

    const credentials = Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64');

    try {
      const response = await fetch(this.AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        body: 'grant_type=client_credentials',
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Token request failed:', data);
        throw new Error(`Failed to get access token: ${response.status} - ${JSON.stringify(data)}`);
      }

      console.log('Successfully obtained access token');
      return data;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  public static async createPayment(
    amount: number,
    customerEmail: string,
    customerName: string,
    customerPhone: string,
  ): Promise<PaymentResponse> {
    console.log('Creating payment with amount:', amount);

    const accessToken = await this.getAccessToken();

    // Construire les URLs de redirection absolues
    const baseUrl = this.BASE_APP_URL;
    const successUrl = `${baseUrl}/payment/success`;
    const cancelUrl = `${baseUrl}/payment/cancel`;

    const payload: CreatePaymentRequest = {
      amount: amount * 100, // Convert to cents
      customerTrns: `Commande Chanvre Vert - ${customerName}`,
      customer: {
        email: customerEmail,
        fullName: customerName,
        phone: customerPhone,
        countryCode: 'FR',
        requestLang: 'fr-FR',
      },
      paymentTimeout: 300,
      sourceCode: this.SOURCE_CODE!,
      redirectUrl: successUrl,
      cancelUrl: cancelUrl,
    };

    console.log('Sending request to Viva Wallet:', {
      url: `${this.BASE_URL}/checkout/v2/orders`,
      payload,
    });

    try {
      const response = await fetch(`${this.BASE_URL}/checkout/v2/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.access_token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        console.error('Viva Wallet API error:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
        });
        throw new Error(`Payment creation failed: Status ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Viva Wallet API response:', data);

      return {
        orderCode: data.orderCode,
        smartCheckoutUrl: `https://www.vivapayments.com/web/checkout?ref=${data.orderCode}`,
      };
    } catch (error) {
      console.error('Error during payment creation:', error);
      throw error;
    }
  }

  /**
   * Vérifie le statut d'une transaction
   * @param transactionId Identifiant de la transaction
   * @returns Le statut et les détails de la transaction
   */
  public static async verifyTransaction(transactionId: string): Promise<any> {
    console.log('Vérification de la transaction:', transactionId);

    const accessToken = await this.getAccessToken();

    try {
      const response = await fetch(`${this.BASE_URL}/checkout/v2/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken.access_token}`,
          Accept: 'application/json',
        },
      });

      const responseText = await response.text();
      console.log('Transaction raw response:', responseText);

      if (!response.ok) {
        console.error('Viva Wallet API error:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
        });
        throw new Error(
          `Transaction verification failed: Status ${response.status} - ${responseText}`,
        );
      }

      const data = JSON.parse(responseText);
      console.log('Transaction status:', data);

      return data;
    } catch (error) {
      console.error('Error during transaction verification:', error);
      throw error;
    }
  }
}
