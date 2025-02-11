// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
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

export default buildConfig({
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
    url: process.env.DATABASE_URI || '',
  }),

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
      logger: false, // Désactive les logs de debug
      debug: false, // Désactive les logs de debug
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users, Products, ProductCategories, Orders],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
