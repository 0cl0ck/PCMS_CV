declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      DATABASE_URI: string;
      NEXT_PUBLIC_SERVER_URL: string;
      PAYLOAD_PUBLIC_SERVER_URL: string;
      PAYLOAD_SECRET: string;
      PORT: number;
      SMTP_HOST: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      SMTP_APP_PASS: string;
      SMTP_PORT: number;
      VIVA_WALLET_CLIENT_ID: string;
      VIVA_WALLET_CLIENT_SECRET: string;
      VIVA_WALLET_SOURCE_CODE: string;
      VIVA_WALLET_WEBHOOK_AUTHORIZATION: string;
      S3_BUCKET: string;
      S3_REGION: string;
      S3_ACCESS_KEY_ID: string;
      S3_SECRET_ACCESS_KEY: string;
      S3_ENDPOINT_URL: string;
      S3_FORCE_PATH_STYLE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
