/* eslint-disable @typescript-eslint/no-unsafe-return */
import { users } from '@pinpoint/database/schema/userbase';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { generateId, Models } from 'src/database/database.utils';

// Pins table
export const pins = sqliteTable('pins', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.PIN)),
  title: text('title').notNull(),
  description: text('description'),
  label: text('label'),
  address: text('address'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  category: text('category'),
  rating: real('rating'),
  color: text('color'),
  url: text('url'),
  createdById: text('created_by_id')
    .notNull()
    .references(() => users.id),
  isDeleted: integer('is_deleted').notNull().default(0),
  deletedAt: integer('deleted_at'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});
