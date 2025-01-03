import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  admin: {
    useAsTitle: 'name',
    group: 'E-commerce',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom de la catégorie',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image de la catégorie',
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      admin: {
        description: 'Identifiant unique pour la catégorie (ex: fleurs, huiles, etc.)',
      },
    },
    ...slugField(),
  ],
}