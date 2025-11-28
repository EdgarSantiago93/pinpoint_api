import { users } from '@pinpoint/database/schema/userbase';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
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
  locationMetadata: text('location_metadata', { mode: 'json' })
    .$type<{ country?: string; city?: string; neighborhood?: string }>()
    .notNull(),
  category: text('category'),
  rating: real('rating'),
  color: text('color'),
  icon: text('icon'),
  url: text('url'),
  aspects: text('aspects', { mode: 'json' }).$type<string[]>(),
  placeId: text('place_id').notNull(),
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

export const mustKnows = sqliteTable('must_knows', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.MUST_KNOW)),
  content: text('content').notNull(),
  pinId: text('pin_id')
    .notNull()
    .references(() => pins.id),
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

export const pinVisits = sqliteTable('pin_visits', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.VISIT)),
  pinId: text('pin_id')
    .notNull()
    .references(() => pins.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  visitedAt: integer('visited_at', { mode: 'timestamp' }).notNull(),
});


