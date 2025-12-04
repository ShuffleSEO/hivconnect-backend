/**
 * Import providers via staging API
 *
 * This script imports providers by calling the staging API endpoints
 * Run: pnpm tsx scripts/import-via-api.ts
 */

const STAGING_URL = 'https://hivconnect-backend-staging.shuffle-seo.workers.dev'

// Sample provider for testing - just one provider first
const testProvider = {
  name: 'Eric B. Chandler Health Center',
  slug: 'eric-chandler-health-center',
  description: 'Comprehensive HIV care and support services in a welcoming, community-focused environment.',
  type: 'FQHC',
  location: {
    address: '35 Commercial Avenue',
    city: 'New Brunswick',
    state: 'NJ',
    zipCode: '08901',
    county: 'middlesex',
  },
  contact: {
    phone: '(732) 745-4500',
    phone24hr: '(732) 745-4500',
    email: 'info@chandlerhealth.org',
    website: 'https://www.chandlerhealth.org',
  },
  hours: {
    monday: '08:00 - 17:00',
    tuesday: '08:00 - 17:00',
    wednesday: '08:00 - 17:00',
    thursday: '08:00 - 17:00',
    friday: '08:00 - 17:00',
    saturday: '09:00 - 13:00',
    sunday: 'Closed',
  },
  services: {
    medical: [
      { service: 'HIV Treatment' },
      { service: 'PrEP Services' },
      { service: 'STD Testing' },
      { service: 'Dental Care' },
      { service: 'Mental Health Services' },
    ],
    support: [
      { service: 'Case Management' },
      { service: 'Mental Health' },
      { service: 'Housing Assistance' },
      { service: 'Transportation' },
      { service: 'Insurance Assistance' },
    ],
    prevention: [
      { service: 'HIV Testing' },
      { service: 'Counseling' },
      { service: 'PrEP Counseling' },
      { service: 'HIV Education' },
      { service: 'Risk Reduction' },
    ],
  },
  eligibility: [
    { requirement: 'LGBTQ' },
    { requirement: 'Youth' },
    { requirement: 'Women' },
  ],
  ryanWhite: true,
  ryanWhiteParts: ['A', 'B', 'C'],
  languages: [
    { language: 'English' },
    { language: 'Spanish' },
  ],
  accessibility: [
    { feature: 'Wheelchair' },
    { feature: 'Parking' },
    { feature: 'Public Transit' },
  ],
  insurance: [
    { plan: 'Medicaid' },
    { plan: 'Medicare' },
    { plan: 'Private' },
    { plan: 'Uninsured' },
  ],
  coordinates: {
    lat: 40.4862,
    lng: -74.4518,
  },
  status: 'active',
}

async function createProvider(providerData: any) {
  try {
    console.log(`Creating provider: ${providerData.name}`)

    const response = await fetch(`${STAGING_URL}/api/providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(providerData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Failed (${response.status}):`, errorText)
      return false
    }

    const result = await response.json()
    console.log(`✅ Created: ${result.doc.name} (ID: ${result.doc.id})`)
    return true
  } catch (error) {
    console.error(`❌ Error:`, error)
    return false
  }
}

async function main() {
  console.log('🚀 Testing API import...\n')
  console.log(`API URL: ${STAGING_URL}\n`)

  const success = await createProvider(testProvider)

  if (success) {
    console.log('\n✨ Test successful! Ready to import all providers.')
  } else {
    console.log('\n❌ Test failed. Check the error above.')
  }
}

main()
