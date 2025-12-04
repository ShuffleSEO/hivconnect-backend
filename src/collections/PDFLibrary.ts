import { CollectionConfig } from 'payload';
import { afterChangeHook, afterDeleteHook } from '../hooks/triggerFrontendRebuild';

export const PDFLibrary: CollectionConfig = {
  slug: 'pdf-library',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'versionNumber', 'category', 'status'],
    description: 'Versioned PDF document management',
  },
  hooks: {
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
  },
  access: {
    read: ({ req: { user } }) => {
      // Current PDFs are public
      if (user) return true;
      return {
        status: { equals: 'current' },
      };
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'PDF File',
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'versionNumber',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., 1.0, 2.1, 3.0',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Forms', value: 'forms' },
        { label: 'Reports', value: 'reports' },
        { label: 'Guides', value: 'guides' },
        { label: 'Policies', value: 'policies' },
        { label: 'Bylaws', value: 'bylaws' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'current',
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
  // Enable versions to track document history
  versions: {
    drafts: false,
    maxPerDoc: 50,
  },
};
