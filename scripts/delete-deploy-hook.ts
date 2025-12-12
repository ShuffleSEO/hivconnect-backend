/**
 * Delete a specific deploy hook by ID
 */

const ACCOUNT_ID = '77936f7f1fecd5df8504adaf96fad1fb';
const PROJECT_NAME = 'hivconnect-frontend';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'vr_kKPeVRJhlFpLH2eWq7AIJm4LtSSDSaY1nw5Xl';

const HOOK_ID = process.argv[2];

if (!HOOK_ID) {
  console.error('❌ Error: Hook ID is required');
  console.error('Usage: pnpm tsx scripts/delete-deploy-hook.ts <hook_id>');
  process.exit(1);
}

async function deleteDeployHook() {
  console.log(`🗑️  Deleting deploy hook: ${HOOK_ID}\n`);

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deploy_hooks/${HOOK_ID}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Failed to delete deploy hook:');
      console.error(JSON.stringify(errorData, null, 2));
      process.exit(1);
    }

    const data = await response.json();
    console.log('✅ Deploy hook deleted successfully!\n');
    console.log(JSON.stringify(data, null, 2));

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteDeployHook();
