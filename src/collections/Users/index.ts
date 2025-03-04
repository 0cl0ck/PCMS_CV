import type { GenerateEmailHTMLArgs } from '@/types/payload-auth';
import type { CollectionConfig } from 'payload';

const isAdminOrSelf = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: false, // Désactiver complètement la vérification par email
    forgotPassword: {
      generateEmailHTML: ({ token }: GenerateEmailHTMLArgs) => {
        return `
          <h1>Réinitialisation de votre mot de passe</h1>
          <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}">
            Réinitialiser mon mot de passe
          </a>
        `;
      },
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Les admins sont automatiquement vérifiés
          if (data.role === 'admin') {
            data._verified = true;
          } else {
            // Les utilisateurs normaux doivent vérifier leur email
            data._verified = false;
          }
        }
        return data;
      },
    ],
  },
  access: {
    read: isAdminOrSelf,
    create: () => true,
    update: isAdminOrSelf,
    delete: ({ req: { user } }) => user?.role === 'admin',
    admin: ({ req: { user } }) => user?.role === 'admin',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'customer',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
  timestamps: true,
};

