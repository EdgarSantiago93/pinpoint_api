import { pins } from '@pinpoint/database/schema/pins';
import { users } from '@pinpoint/database/schema/userbase';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateId, Models } from 'src/database/database.utils';

export const feedPosts = sqliteTable('feed_posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.FEED_POST)),
  type: text('type').notNull(), // visit, pinned_place
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  placeId: text('place_id')
    .notNull()
    .references(() => pins.id),
  createdById: text('created_by_id')
    .notNull()
    .references(() => users.id),
  status: text('status').notNull().default('pending'), // pending, approved, rejected
  isDeleted: integer('is_deleted').notNull().default(0),
  deletedAt: integer('deleted_at'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});
