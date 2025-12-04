/**
 * Import providers to PRODUCTION
 * Run: ADMIN_PASSWORD=yourpassword pnpm tsx scripts/import-production.ts
 */

// Import provider data and transformation function
import { providers, transformProvider } from './import-providers'

const PRODUCTION_URL = 'https://hivconnect-backend.shuffle-seo.workers.dev'
const ADMIN_EMAIL = 'kevin@shuffleseo.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('❌ Error: ADMIN_PASSWORD environment variable is required')
  console.error('Usage: ADMIN_PASSWORD=yourpassword pnpm tsx scripts/import-production.ts')
  process.exit(1)
}

// Confirm production deployment
console.log('⚠️  WARNING: You are about to import to PRODUCTION')
console.log(`URL: ${PRODUCTION_URL}`)
console.log('Press Ctrl+C to cancel, or wait 3 seconds to continue...')

await new Promise(resolve => setTimeout(resolve, 3000))

interface LoginResponse {
  message: string
  user: any
  token?: string
  exp?: number
}

async function login(): Promise<string | null> {
  try {
    console.log('🔐 Logging in as', ADMIN_EMAIL, '...')
    const response = await fetch(`${PRODUCTION_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Login failed (${response.status}):`, errorText)
      return null
    }

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

async function createProvider(providerData: any, authCookie: string): Promise<boolean> {
  try {
    const response = await fetch(`${PRODUCTION_URL}/api/providers`, {
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

async function main() {
  console.log('🚀 Starting PRODUCTION import...\n')
  console.log(`API URL: ${PRODUCTION_URL}`)
  console.log(`Providers to import: ${providers.length}\n`)

  const authCookie = await login()
  if (!authCookie) {
    console.error('❌ Cannot proceed without authentication')
    process.exit(1)
  }

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

    console.log('')
  }

  console.log('='.repeat(60))
  console.log('✨ Import complete!')
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📊 Total: ${providers.length}`)
  console.log('='.repeat(60))

  console.log('\n🔍 Verifying import...')
  const verifyResponse = await fetch(`${PRODUCTION_URL}/api/providers?limit=100`)
  const verifyData = await verifyResponse.json()
  console.log(`✅ Database now contains ${verifyData.totalDocs} providers`)

  if (successCount === providers.length) {
    console.log('\n🎉 All providers imported to PRODUCTION successfully!')
    process.exit(0)
  } else {
    console.log('\n⚠️  Some providers failed to import. Check errors above.')
    process.exit(1)
  }
}

main()
