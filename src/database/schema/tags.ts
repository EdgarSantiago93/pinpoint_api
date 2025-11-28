import { generateId, Models } from '@pinpoint/database/database.utils';
import { pins } from '@pinpoint/database/schema/pins';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// general tags available to everyone
export const tags = sqliteTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.TAG)),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  isDeleted: integer('is_deleted').notNull().default(0),
  deletedAt: integer('deleted_at'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const tagTranslations = sqliteTable('tag_translations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.TAG_TRANSLATION)),
  tagId: text('tag_id')
    .notNull()
    .references(() => tags.id),
  language: text('language').notNull(), // 'en', 'es', 'fr', etc.
  value: text('value').notNull(), // Translation: "Restaurante Italiano"
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

// tags specific to a pin
export const pinTags = sqliteTable('pin_tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.TAG_PIN)),
  tagId: text('tag_id')
    .notNull()
    .references(() => tags.id),
  pinId: text('pin_id')
    .notNull()
    .references(() => pins.id),
});
