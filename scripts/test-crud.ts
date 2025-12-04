/**
 * Test CRUD operations on staging API
 * Run: ADMIN_PASSWORD=yourpassword pnpm tsx scripts/test-crud.ts
 */

const STAGING_URL = 'https://hivconnect-backend-staging.shuffle-seo.workers.dev'
const ADMIN_EMAIL = 'kevin@shuffleseo.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('❌ Error: ADMIN_PASSWORD environment variable is required')
  process.exit(1)
}

async function login(): Promise<string | null> {
  console.log('🔐 Logging in...')
  const response = await fetch(`${STAGING_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })

  if (!response.ok) {
    console.error('❌ Login failed:', response.status)
    return null
  }

  const setCookieHeader = response.headers.get('set-cookie')
  if (!setCookieHeader) {
    console.error('❌ No auth cookie')
    return null
  }

  console.log('✅ Logged in\n')
  return setCookieHeader
}

async function testCRUD(authCookie: string) {
  let testProviderId: number | null = null

  // CREATE
  console.log('📝 Testing CREATE...')
  const createResponse = await fetch(`${STAGING_URL}/api/providers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: authCookie,
    },
    body: JSON.stringify({
      name: 'TEST Provider - Please Delete',
      slug: 'test-provider-delete-me',
      description: 'This is a test provider for CRUD testing',
      type: 'Other',
      location: {
        address: '123 Test St',
        city: 'Test City',
        state: 'NJ',
        zipCode: '08901',
        county: 'middlesex',
      },
      contact: {
        phone: '(555) 555-5555',
        email: 'test@example.com',
        website: 'https://example.com',
      },
      hours: {
        monday: '09:00 - 17:00',
        tuesday: '09:00 - 17:00',
        wednesday: '09:00 - 17:00',
        thursday: '09:00 - 17:00',
        friday: '09:00 - 17:00',
      },
      services: {
        medical: [{ service: 'Test Service' }],
        support: [],
        prevention: [],
      },
      eligibility: [],
      ryanWhite: false,
      languages: [{ language: 'English' }],
      accessibility: [{ feature: 'Test Feature' }],
      insurance: [{ plan: 'Test Insurance' }],
      coordinates: { lat: 40.4862, lng: -74.4518 },
      status: 'pending',
    }),
  })

  if (!createResponse.ok) {
    console.error('❌ CREATE failed:', createResponse.status, await createResponse.text())
    return
  }

  const createData = await createResponse.json()
  testProviderId = createData.doc.id
  console.log(`✅ CREATE success - ID: ${testProviderId}\n`)

  // READ
  console.log('📖 Testing READ...')
  const readResponse = await fetch(`${STAGING_URL}/api/providers/${testProviderId}`)
  if (!readResponse.ok) {
    console.error('❌ READ failed:', readResponse.status)
    return
  }
  const readData = await readResponse.json()
  console.log(`✅ READ success - Name: ${readData.name}\n`)

  // UPDATE
  console.log('✏️  Testing UPDATE...')
  const updateResponse = await fetch(`${STAGING_URL}/api/providers/${testProviderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: authCookie,
    },
    body: JSON.stringify({
      description: 'UPDATED: This provider was updated via API test',
      status: 'inactive',
    }),
  })

  if (!updateResponse.ok) {
    console.error('❌ UPDATE failed:', updateResponse.status, await updateResponse.text())
    return
  }

  const updateData = await updateResponse.json()
  console.log(`✅ UPDATE success - Status: ${updateData.doc.status}\n`)

  // DELETE
  console.log('🗑️  Testing DELETE...')
  const deleteResponse = await fetch(`${STAGING_URL}/api/providers/${testProviderId}`, {
    method: 'DELETE',
    headers: { Cookie: authCookie },
  })

  if (!deleteResponse.ok) {
    console.error('❌ DELETE failed:', deleteResponse.status, await deleteResponse.text())
    return
  }

  console.log('✅ DELETE success\n')

  // Verify deletion
  console.log('🔍 Verifying deletion...')
  const verifyResponse = await fetch(`${STAGING_URL}/api/providers/${testProviderId}`)
  if (verifyResponse.status === 404) {
    console.log('✅ Provider successfully deleted (404)\n')
  } else {
    console.log('⚠️  Provider still exists (may be soft-deleted)\n')
  }
}

async function main() {
  console.log('🚀 Testing CRUD operations\n')
  const authCookie = await login()
  if (!authCookie) {
    process.exit(1)
  }
  await testCRUD(authCookie)
  console.log('✨ CRUD test complete!')
}

main()
