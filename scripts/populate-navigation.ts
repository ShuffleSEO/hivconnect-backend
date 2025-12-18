#!/usr/bin/env tsx
/**
 * Populate SiteSettings navigation with default menu structure
 */

const BACKEND_URL = 'https://hivconnect-backend-production.shuffle-seo.workers.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kevin@shuffleseo.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'er9fmtfKMC$';

async function login() {
  const response = await fetch(`${BACKEND_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
}

async function updateSiteSettings(token: string) {
  // First, fetch current settings
  const getResponse = await fetch(`${BACKEND_URL}/api/globals/site-settings`);
  if (!getResponse.ok) {
    throw new Error(`Failed to fetch current settings: ${getResponse.statusText}`);
  }
  const currentSettings = await getResponse.json();
  console.log('Current settings:', Object.keys(currentSettings));

  const navigation = [
    {
      label: 'Services',
      url: '#',
      order: 0,
      openInNewTab: false,
      children: [
        { label: 'Get Tested', url: '/get-tested', order: 0, openInNewTab: false },
        { label: 'Treatment & Care', url: '/treatment-care', order: 1, openInNewTab: false },
        { label: 'Support Resources', url: '/support-resources', order: 2, openInNewTab: false },
        { label: 'Find Services', url: '/find-services', order: 3, openInNewTab: false },
      ],
    },
    {
      label: 'About',
      url: '#',
      order: 1,
      openInNewTab: false,
      children: [
        { label: 'About Us', url: '/about', order: 0, openInNewTab: false },
        { label: 'Planning Council', url: '/planning-council-application', order: 1, openInNewTab: false },
        { label: 'FAQ', url: '/faq', order: 2, openInNewTab: false },
      ],
    },
    {
      label: 'Resources',
      url: '#',
      order: 2,
      openInNewTab: false,
      children: [
        { label: 'Resource Library', url: '/resources', order: 0, openInNewTab: false },
        { label: 'Bylaws', url: '/bylaws', order: 1, openInNewTab: false },
        { label: 'Service Standards', url: '/service-standards', order: 2, openInNewTab: false },
        { label: 'Events', url: '/events', order: 3, openInNewTab: false },
      ],
    },
    {
      label: 'Contact',
      url: '/contact',
      order: 3,
      openInNewTab: false,
      children: [],
    },
  ];

  // Merge navigation into existing settings
  const updatedSettings = {
    ...currentSettings,
    hotlineNumber: currentSettings.hotlineNumber || '1-800-HIV-INFO',
    contactEmail: currentSettings.contactEmail || 'info@hivconnectcnj.org',
    navigation,
  };

  const response = await fetch(`${BACKEND_URL}/api/globals/site-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
    },
    body: JSON.stringify(updatedSettings),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Update failed: ${response.statusText}\n${error}`);
  }

  return await response.json();
}

async function main() {
  try {
    console.log('🔐 Logging in...');
    const token = await login();
    console.log('✅ Login successful');

    console.log('📝 Updating SiteSettings navigation...');
    const result = await updateSiteSettings(token);
    console.log('✅ Navigation updated successfully!');
    console.log('📊 Navigation items:', result.navigation?.length || 0);

    result.navigation?.forEach((item: any) => {
      console.log(`  - ${item.label} (${item.children?.length || 0} children)`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
