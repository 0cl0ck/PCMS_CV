// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp'; // sharp-import
import { fileURLToPath } from 'url';

import { defaultLexical } from '@/fields/defaultLexical';
import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { Orders } from './collections/Orders';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { ProductCategories } from './collections/ProductCategories';
import { Products } from './collections/Products';
import { Users } from './collections/Users';
import { Footer } from './Footer/config';
import { Header } from './Header/config';
import { plugins } from './plugins';
import { getServerSideURL } from './utilities/getURL';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Protection contre la double initialisation des modèles
let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = { config: null };
}

const config = {
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
    useTempFiles: true,
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || '',
    defaultFromName: 'Chanvre Vert',
    transportOptions: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASS,
      },
      logger: false,
      debug: false,
    },
  }),
  collections: [Media, Products, ProductCategories, Categories, Posts, Pages, Orders, Users],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
      },
    }),
  ],
  globals: [Header, Footer],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
};

if (!cached.config) {
  cached.config = config;
}

// Log la configuration pour le débogage
console.log('PayloadCMS Config Details:', {
  hasS3Config: config.plugins.some(p => {
    const plugin = p as any;
    return plugin?.collections?.media === true;
  }),
  collections: config.collections.map(c => ({
    slug: c.slug,
    hasUploadField: c.fields?.some((f: any) => f.type === 'upload' || (f.type === 'array' && f.fields?.some((sf: any) => sf.type === 'upload'))),
    hasRelationField: c.fields?.some((f: any) => f.type === 'relationship' || (f.type === 'array' && f.fields?.some((sf: any) => sf.type === 'relationship'))),
  })),
  corsOrigins: config.cors,
  uploadConfig: config.upload,
  s3Plugin: config.plugins.find(p => (p as any)?.collections?.media === true),
});

// Vérifier spécifiquement les collections Products et ProductCategories
const productsConfig = config.collections.find(c => c.slug === 'products');
const productCategoriesConfig = config.collections.find(c => c.slug === 'product-categories');

console.log('Products Collection Config:', {
  uploadFields: productsConfig?.fields?.filter((f: any) => f.type === 'upload' || (f.type === 'array' && f.fields?.some((sf: any) => sf.type === 'upload'))),
  relationFields: productsConfig?.fields?.filter((f: any) => f.type === 'relationship' || (f.type === 'array' && f.fields?.some((sf: any) => sf.type === 'relationship'))),
});

console.log('Product Categories Collection Config:', {
  uploadFields: productCategoriesConfig?.fields?.filter((f: any) => f.type === 'upload'),
  relationFields: productCategoriesConfig?.fields?.filter((f: any) => f.type === 'relationship'),
});

export default buildConfig(cached.config);
