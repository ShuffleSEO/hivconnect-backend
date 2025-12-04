import { CollectionConfig } from 'payload';
import { afterChangeHook, afterDeleteHook } from '../hooks/triggerFrontendRebuild';

export const Providers: CollectionConfig = {
  slug: 'providers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'county', 'ryanWhite', 'status'],
    description: 'HIV service providers in the Middlesex-Somerset-Hunterdon area',
  },
  hooks: {
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
  },
  access: {
    // Public read access for frontend
    read: () => true,
    // Admin only for mutations
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.name && !value) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'FQHC (Federally Qualified Health Center)', value: 'FQHC' },
        { label: 'Hospital', value: 'Hospital' },
        { label: 'Community Organization', value: 'Community' },
        { label: 'Mental Health Center', value: 'Mental Health' },
        { label: 'Substance Abuse Center', value: 'Substance Abuse' },
        { label: 'Other', value: 'Other' },
      ],
    },

    // Location Information
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          defaultValue: 'NJ',
        },
        {
          name: 'zipCode',
          type: 'text',
          required: true,
        },
        {
          name: 'county',
          type: 'select',
          required: true,
          options: [
            { label: 'Middlesex', value: 'middlesex' },
            { label: 'Somerset', value: 'somerset' },
            { label: 'Hunterdon', value: 'hunterdon' },
          ],
        },
      ],
    },

    // Contact Information
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'phone24hr',
          type: 'text',
          admin: {
            description: '24-hour hotline (if different from main phone)',
          },
        },
        {
          name: 'fax',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'website',
          type: 'text',
        },
      ],
    },

    // Hours of Operation
    {
      name: 'hours',
      type: 'group',
      fields: [
        { name: 'monday', type: 'text' },
        { name: 'tuesday', type: 'text' },
        { name: 'wednesday', type: 'text' },
        { name: 'thursday', type: 'text' },
        { name: 'friday', type: 'text' },
        { name: 'saturday', type: 'text' },
        { name: 'sunday', type: 'text' },
      ],
    },

    // Services (nested structure)
    {
      name: 'services',
      type: 'group',
      fields: [
        {
          name: 'medical',
          type: 'array',
          label: 'Medical Services',
          fields: [
            {
              name: 'service',
              type: 'text',
            },
          ],
        },
        {
          name: 'support',
          type: 'array',
          label: 'Support Services',
          fields: [
            {
              name: 'service',
              type: 'text',
            },
          ],
        },
        {
          name: 'prevention',
          type: 'array',
          label: 'Prevention Services',
          fields: [
            {
              name: 'service',
              type: 'text',
            },
          ],
        },
      ],
    },

    // Eligibility
    {
      name: 'eligibility',
      type: 'array',
      label: 'Eligibility Requirements',
      fields: [
        {
          name: 'requirement',
          type: 'text',
        },
      ],
    },

    // Ryan White Program
    {
      name: 'ryanWhite',
      type: 'checkbox',
      label: 'Ryan White Program Participant',
      defaultValue: false,
    },
    {
      name: 'ryanWhiteParts',
      type: 'select',
      hasMany: true,
      label: 'Ryan White Parts',
      options: [
        { label: 'Part A', value: 'A' },
        { label: 'Part B', value: 'B' },
        { label: 'Part C', value: 'C' },
        { label: 'Part D', value: 'D' },
      ],
      admin: {
        condition: (data) => data.ryanWhite,
      },
    },

    // Languages
    {
      name: 'languages',
      type: 'array',
      label: 'Languages Offered',
      fields: [
        {
          name: 'language',
          type: 'text',
        },
      ],
    },

    // Accessibility Features
    {
      name: 'accessibility',
      type: 'array',
      label: 'Accessibility Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },

    // Insurance
    {
      name: 'insurance',
      type: 'array',
      label: 'Insurance Accepted',
      fields: [
        {
          name: 'plan',
          type: 'text',
        },
      ],
    },

    // Coordinates for map
    {
      name: 'coordinates',
      type: 'group',
      label: 'Map Coordinates',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
        },
      ],
    },

    // Status
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
    },
  ],
};
