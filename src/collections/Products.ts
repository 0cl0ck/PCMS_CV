import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'productType', 'price', 'stock', 'status'],
    group: 'E-commerce',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'productType',
      type: 'radio',
      required: true,
      defaultValue: 'simple',
      options: [
        {
          label: 'Produit Simple',
          value: 'simple',
        },
        {
          label: 'Produit Variable',
          value: 'variable',
        },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        condition: (data) => data.productType === 'simple',
        description: 'Prix pour un produit simple',
      },
    },
    {
      name: 'stock',
      type: 'number',
      required: false,
      min: 0,
      admin: {
        condition: (data) => data.productType === 'simple',
        description: 'Stock pour un produit simple',
      },
    },
    {
      name: 'variations',
      type: 'array',
      label: 'Variantes du produit',
      admin: {
        condition: (data) => data.productType === 'variable',
        description: 'Ajoutez les différentes variantes du produit',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nom de la variante',
          admin: {
            description: 'Ex: 1g, 3g, 5g, etc.',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Prix de la variante',
        },
        {
          name: 'stock',
          type: 'number',
          required: false,
          min: 0,
          label: 'Stock de la variante',
        },
      ],
    },
    {
      name: 'thcContent',
      type: 'number',
      required: true,
      min: 0,
      max: 0.3,
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: '_status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Brouillon',
          value: 'products_draft',
        },
        {
          label: 'Publié',
          value: 'products_published',
        },
      ],
      defaultValue: 'products_draft',
      admin: {
        description: 'Statut du produit',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
  versions: {
    drafts: true,
  },
}
