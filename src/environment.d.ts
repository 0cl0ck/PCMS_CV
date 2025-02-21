declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NEXT_PUBLIC_SERVER_URL: string;
      PAYLOAD_PUBLIC_SERVER_URL: string;
      PAYLOAD_SECRET: string;
      PORT: number;
      SMTP_HOST: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      SMTP_PORT: number;
      VIVA_WALLET_CLIENT_ID: string;
      VIVA_WALLET_CLIENT_SECRET: string;
      VIVA_WALLET_SOURCE_CODE: string;
      VIVA_WALLET_WEBHOOK_AUTHORIZATION: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
