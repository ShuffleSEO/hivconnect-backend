import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`providers_services_medical\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`service\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_services_medical_order_idx\` ON \`providers_services_medical\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_services_medical_parent_id_idx\` ON \`providers_services_medical\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_services_support\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`service\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_services_support_order_idx\` ON \`providers_services_support\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_services_support_parent_id_idx\` ON \`providers_services_support\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_services_prevention\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`service\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_services_prevention_order_idx\` ON \`providers_services_prevention\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_services_prevention_parent_id_idx\` ON \`providers_services_prevention\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_eligibility\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`requirement\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_eligibility_order_idx\` ON \`providers_eligibility\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_eligibility_parent_id_idx\` ON \`providers_eligibility\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_ryan_white_parts\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_ryan_white_parts_order_idx\` ON \`providers_ryan_white_parts\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`providers_ryan_white_parts_parent_idx\` ON \`providers_ryan_white_parts\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_languages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_languages_order_idx\` ON \`providers_languages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_languages_parent_id_idx\` ON \`providers_languages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_accessibility\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_accessibility_order_idx\` ON \`providers_accessibility\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_accessibility_parent_id_idx\` ON \`providers_accessibility\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_insurance\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`plan\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_insurance_order_idx\` ON \`providers_insurance\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_insurance_parent_id_idx\` ON \`providers_insurance\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`type\` text,
  	\`location_address\` text NOT NULL,
  	\`location_city\` text NOT NULL,
  	\`location_state\` text DEFAULT 'NJ',
  	\`location_zip_code\` text NOT NULL,
  	\`location_county\` text NOT NULL,
  	\`contact_phone\` text NOT NULL,
  	\`contact_phone24hr\` text,
  	\`contact_fax\` text,
  	\`contact_email\` text,
  	\`contact_website\` text,
  	\`hours_monday\` text,
  	\`hours_tuesday\` text,
  	\`hours_wednesday\` text,
  	\`hours_thursday\` text,
  	\`hours_friday\` text,
  	\`hours_saturday\` text,
  	\`hours_sunday\` text,
  	\`ryan_white\` integer DEFAULT false,
  	\`coordinates_lat\` numeric NOT NULL,
  	\`coordinates_lng\` numeric NOT NULL,
  	\`status\` text DEFAULT 'active' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`providers_name_idx\` ON \`providers\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`providers_slug_idx\` ON \`providers\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`providers_updated_at_idx\` ON \`providers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`providers_created_at_idx\` ON \`providers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`resources\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`pdf_file_id\` integer,
  	\`external_link\` text,
  	\`language\` text DEFAULT 'english' NOT NULL,
  	\`featured\` integer DEFAULT false,
  	\`published_date\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`pdf_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`resources_slug_idx\` ON \`resources\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`resources_pdf_file_idx\` ON \`resources\` (\`pdf_file_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_updated_at_idx\` ON \`resources\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`resources_created_at_idx\` ON \`resources\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`resources_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_rels_order_idx\` ON \`resources_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`resources_rels_parent_idx\` ON \`resources_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_rels_path_idx\` ON \`resources_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`resources_rels_tags_id_idx\` ON \`resources_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`blog\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`author\` text DEFAULT 'HIV Connect Central NJ',
  	\`published_date\` text,
  	\`featured_image_id\` integer,
  	\`excerpt\` text,
  	\`content\` text,
  	\`category\` text,
  	\`language\` text DEFAULT 'english',
  	\`status\` text DEFAULT 'draft',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_slug_idx\` ON \`blog\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_featured_image_idx\` ON \`blog\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_updated_at_idx\` ON \`blog\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_created_at_idx\` ON \`blog\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`blog__status_idx\` ON \`blog\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`blog_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_rels_order_idx\` ON \`blog_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`blog_rels_parent_idx\` ON \`blog_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_rels_path_idx\` ON \`blog_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`blog_rels_tags_id_idx\` ON \`blog_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_author\` text DEFAULT 'HIV Connect Central NJ',
  	\`version_published_date\` text,
  	\`version_featured_image_id\` integer,
  	\`version_excerpt\` text,
  	\`version_content\` text,
  	\`version_category\` text,
  	\`version_language\` text DEFAULT 'english',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_v_parent_idx\` ON \`_blog_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_slug_idx\` ON \`_blog_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_featured_image_idx\` ON \`_blog_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_updated_at_idx\` ON \`_blog_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_created_at_idx\` ON \`_blog_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version__status_idx\` ON \`_blog_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_created_at_idx\` ON \`_blog_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_updated_at_idx\` ON \`_blog_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_latest_idx\` ON \`_blog_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_blog_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_blog_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_v_rels_order_idx\` ON \`_blog_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_rels_parent_idx\` ON \`_blog_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_rels_path_idx\` ON \`_blog_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_rels_tags_id_idx\` ON \`_blog_v_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`pdf_library\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`file_id\` integer NOT NULL,
  	\`description\` text,
  	\`version_number\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`status\` text DEFAULT 'current' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pdf_library_file_idx\` ON \`pdf_library\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`pdf_library_updated_at_idx\` ON \`pdf_library\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pdf_library_created_at_idx\` ON \`pdf_library\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_pdf_library_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_file_id\` integer NOT NULL,
  	\`version_description\` text,
  	\`version_version_number\` text NOT NULL,
  	\`version_category\` text NOT NULL,
  	\`version_status\` text DEFAULT 'current' NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pdf_library\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pdf_library_v_parent_idx\` ON \`_pdf_library_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pdf_library_v_version_version_file_idx\` ON \`_pdf_library_v\` (\`version_file_id\`);`)
  await db.run(sql`CREATE INDEX \`_pdf_library_v_version_version_updated_at_idx\` ON \`_pdf_library_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pdf_library_v_version_version_created_at_idx\` ON \`_pdf_library_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pdf_library_v_created_at_idx\` ON \`_pdf_library_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pdf_library_v_updated_at_idx\` ON \`_pdf_library_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_name_idx\` ON \`tags\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_slug_idx\` ON \`tags\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tags_updated_at_idx\` ON \`tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`open_in_new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_order_idx\` ON \`site_settings_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_parent_id_idx\` ON \`site_settings_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'HIV Connect Central NJ' NOT NULL,
  	\`hotline_number\` text NOT NULL,
  	\`logo_id\` integer,
  	\`social_media_facebook\` text,
  	\`social_media_twitter\` text,
  	\`social_media_instagram\` text,
  	\`social_media_linkedin\` text,
  	\`contact_email\` text NOT NULL,
  	\`maintenance_mode\` integer DEFAULT false,
  	\`maintenance_message\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`name\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT 'editor' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`providers_id\` integer REFERENCES providers(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`resources_id\` integer REFERENCES resources(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`blog_id\` integer REFERENCES blog(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pdf_library_id\` integer REFERENCES pdf_library(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tags_id\` integer REFERENCES tags(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_providers_id_idx\` ON \`payload_locked_documents_rels\` (\`providers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_resources_id_idx\` ON \`payload_locked_documents_rels\` (\`resources_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pdf_library_id_idx\` ON \`payload_locked_documents_rels\` (\`pdf_library_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`providers_services_medical\`;`)
  await db.run(sql`DROP TABLE \`providers_services_support\`;`)
  await db.run(sql`DROP TABLE \`providers_services_prevention\`;`)
  await db.run(sql`DROP TABLE \`providers_eligibility\`;`)
  await db.run(sql`DROP TABLE \`providers_ryan_white_parts\`;`)
  await db.run(sql`DROP TABLE \`providers_languages\`;`)
  await db.run(sql`DROP TABLE \`providers_accessibility\`;`)
  await db.run(sql`DROP TABLE \`providers_insurance\`;`)
  await db.run(sql`DROP TABLE \`providers\`;`)
  await db.run(sql`DROP TABLE \`resources\`;`)
  await db.run(sql`DROP TABLE \`resources_rels\`;`)
  await db.run(sql`DROP TABLE \`blog\`;`)
  await db.run(sql`DROP TABLE \`blog_rels\`;`)
  await db.run(sql`DROP TABLE \`_blog_v\`;`)
  await db.run(sql`DROP TABLE \`_blog_v_rels\`;`)
  await db.run(sql`DROP TABLE \`pdf_library\`;`)
  await db.run(sql`DROP TABLE \`_pdf_library_v\`;`)
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
}
