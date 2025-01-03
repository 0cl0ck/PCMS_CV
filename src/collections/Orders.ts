import type { CollectionConfig, CollectionSlug } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    group: 'E-commerce',
  },
  labels: {
    singular: 'Commande',
    plural: 'Commandes',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Client',
    },
    {
      name: 'products',
      type: 'array',
      label: 'Produits',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products' as CollectionSlug,
          required: true,
          label: 'Produit',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          label: 'Quantité',
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      label: 'Total',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      options: [
        {
          label: 'En attente',
          value: 'pending',
        },
        {
          label: 'Payée',
          value: 'paid',
        },
        {
          label: 'Expédiée',
          value: 'shipped',
        },
        {
          label: 'Terminée',
          value: 'completed',
        },
        {
          label: 'Annulée',
          value: 'cancelled',
        },
      ],
      defaultValue: 'pending',
    },
  ],
}

export default Orders
