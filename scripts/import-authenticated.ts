/**
 * Authenticated bulk import of providers to staging
 *
 * This script logs in with admin credentials and imports all providers via API
 * Run: ADMIN_PASSWORD=yourpassword pnpm tsx scripts/import-authenticated.ts
 */

// Import provider data and transformation function
import { providers, transformProvider } from './import-providers'

const STAGING_URL = 'https://hivconnect-backend-staging.shuffle-seo.workers.dev'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kevin@shuffleseo.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('❌ Error: ADMIN_PASSWORD environment variable is required')
  console.error('Usage: ADMIN_PASSWORD=yourpassword pnpm tsx scripts/import-authenticated.ts')
  process.exit(1)
}

interface LoginResponse {
  message: string
  user: any
  token?: string
  exp?: number
}

/**
 * Log in and get authentication cookie
 */
async function login(): Promise<string | null> {
  try {
    console.log('🔐 Logging in as', ADMIN_EMAIL, '...')

    const response = await fetch(`${STAGING_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Login failed (${response.status}):`, errorText)
      return null
    }

    const data: LoginResponse = await response.json()

    // Extract cookies from response headers
    const setCookieHeader = response.headers.get('set-cookie')
    if (!setCookieHeader) {
      console.error('❌ No authentication cookie received')
      return null
    }

    console.log('✅ Login successful!\n')
    return setCookieHeader
  } catch (error) {
    console.error('❌ Login error:', error)
    return null
  }
}

/**
 * Create a provider via API
 */
async function createProvider(providerData: any, authCookie: string): Promise<boolean> {
  try {
    const response = await fetch(`${STAGING_URL}/api/providers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: JSON.stringify(providerData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`   ❌ Failed (${response.status}):`, errorText.substring(0, 200))
      return false
    }

    const result = await response.json()
    console.log(`   ✅ Created (ID: ${result.doc.id})`)
    return true
  } catch (error: any) {
    console.error(`   ❌ Error:`, error.message)
    return false
  }
}

/**
 * Main import function
 */
async function main() {
  console.log('🚀 Starting authenticated bulk import...\n')
  console.log(`API URL: ${STAGING_URL}`)
  console.log(`Providers to import: ${providers.length}\n`)

  // Step 1: Login
  const authCookie = await login()
  if (!authCookie) {
    console.error('❌ Cannot proceed without authentication')
    process.exit(1)
  }

  // Step 2: Import providers
  let successCount = 0
  let errorCount = 0

  console.log('📦 Importing providers...\n')

  for (const oldProvider of providers) {
    try {
      const transformedProvider = transformProvider(oldProvider)
      console.log(`[${successCount + errorCount + 1}/${providers.length}] ${transformedProvider.name}`)

      const success = await createProvider(transformedProvider, authCookie)
      if (success) {
        successCount++
      } else {
        errorCount++
      }
    } catch (error: any) {
      console.error(`   ❌ Transform error:`, error.message)
      errorCount++
    }

    console.log('') // Empty line for readability
  }

  // Step 3: Summary
  console.log('='.repeat(60))
  console.log('✨ Import complete!')
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📊 Total: ${providers.length}`)
  console.log('='.repeat(60))

  // Step 4: Verify
  console.log('\n🔍 Verifying import...')
  const verifyResponse = await fetch(`${STAGING_URL}/api/providers?limit=100`)
  const verifyData = await verifyResponse.json()
  console.log(`✅ Database now contains ${verifyData.totalDocs} providers`)

  if (successCount === providers.length) {
    console.log('\n🎉 All providers imported successfully!')
    process.exit(0)
  } else {
    console.log('\n⚠️  Some providers failed to import. Check errors above.')
    process.exit(1)
  }
}

main()
