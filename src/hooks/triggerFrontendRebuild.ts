/**
 * Log content changes for monitoring
 *
 * Automatic rebuilds will be handled via:
 * - Git push to main branch triggers Cloudflare Pages build
 * - GitHub Actions triggered by webhook from PayloadCMS
 */

import { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';

// Track recent changes to avoid duplicate logs
const recentChanges = new Map<string, number>();
const LOG_COOLDOWN = 5000; // 5 second cooldown for duplicate logs

/**
 * Log content change (for monitoring)
 */
async function logContentChange(collection: string, operation: string, docId: string) {
  const changeKey = `${collection}-${docId}`;
  const now = Date.now();
  const lastChange = recentChanges.get(changeKey);

  // Skip if changed recently (within cooldown period)
  if (lastChange && now - lastChange < LOG_COOLDOWN) {
    return;
  }

  recentChanges.set(changeKey, now);

  console.log('━'.repeat(60));
  console.log('📢 CONTENT CHANGE DETECTED');
  console.log(`   Collection: ${collection}`);
  console.log(`   Operation: ${operation}`);
  console.log(`   Document ID: ${docId}`);
  console.log(`   Timestamp: ${new Date().toISOString()}`);
  console.log('━'.repeat(60));
  console.log('💡 Frontend will rebuild automatically via Git push');
  console.log('━'.repeat(60));
}

/**
 * Collection hook: Log changes after create/update
 */
export const afterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  collection,
}) => {
  const operationLabel = operation === 'create' ? 'created' : 'updated';
  const docId = doc.id || doc.slug || doc.name || 'unknown';

  // Log content change (non-blocking)
  logContentChange(collection.slug, operationLabel, docId).catch((error) => {
    console.error('Error logging content change:', error);
  });

  return doc;
};

/**
 * Global hook: Log changes after global update
 */
export const afterChangeGlobalHook: GlobalAfterChangeHook = async ({
  doc,
  global,
}) => {
  // Log content change (non-blocking)
  logContentChange(global.slug, 'updated', 'global').catch((error) => {
    console.error('Error logging content change:', error);
  });

  return doc;
};

/**
 * After delete hook: Log changes when content is deleted
 */
export const afterDeleteHook: CollectionAfterDeleteHook = async ({
  doc,
  collection,
  id,
  req,
}) => {
  const docId = id || doc?.slug || doc?.name || 'unknown';

  // Log content change (non-blocking)
  logContentChange(collection.slug, 'deleted', String(docId)).catch((error) => {
    console.error('Error logging content change:', error);
  });

  return doc;
};
