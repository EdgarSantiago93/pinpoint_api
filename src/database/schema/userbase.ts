import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { generateId, Models } from 'src/database/database.utils';

// Users table
export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId(Models.USER)),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  bio: text('bio'),
  avatar: text('avatar').default(''),
  role: text('role').notNull().default('USER'),
  status: text('status').notNull().default('active'),

  isDeleted: integer('is_deleted').notNull().default(0),
  deletedAt: integer('deleted_at'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

// // Tags table
// export const tags = sqliteTable('tags', {
//   id: text('id').primaryKey(),
//   name: text('name').notNull().unique(),
//   color: text('color'),
//   createdAt: integer('created_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Pins to Tags junction table (many-to-many)
// export const pinsToTags = sqliteTable('pins_to_tags', {
//   pinId: text('pin_id')
//     .notNull()
//     .references(() => pins.id, { onDelete: 'cascade' }),
//   tagId: text('tag_id')
//     .notNull()
//     .references(() => tags.id, { onDelete: 'cascade' }),
// });

// // Media table
// export const media = sqliteTable('media', {
//   id: text('id').primaryKey(),
//   url: text('url').notNull(),
//   type: text('type').notNull(), // 'image' or 'video'
//   pinId: text('pin_id')
//     .notNull()
//     .references(() => pins.id, { onDelete: 'cascade' }),
//   uploadedById: text('uploaded_by_id')
//     .notNull()
//     .references(() => users.id),
//   createdAt: integer('created_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Comments table
// export const comments = sqliteTable('comments', {
//   id: text('id').primaryKey(),
//   content: text('content').notNull(),
//   pinId: text('pin_id')
//     .notNull()
//     .references(() => pins.id, { onDelete: 'cascade' }),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id),
//   createdAt: integer('created_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: integer('updated_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Visits table
// export const visits = sqliteTable('visits', {
//   id: text('id').primaryKey(),
//   pinId: text('pin_id')
//     .notNull()
//     .references(() => pins.id, { onDelete: 'cascade' }),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id),
//   visitedAt: integer('visited_at', { mode: 'timestamp' }).notNull(),
//   notes: text('notes'),
//   createdAt: integer('created_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Likes table
// export const likes = sqliteTable('likes', {
//   id: text('id').primaryKey(),
//   pinId: text('pin_id')
//     .notNull()
//     .references(() => pins.id, { onDelete: 'cascade' }),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id),
//   createdAt: integer('created_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Ratings table
// export const ratings = sqliteTable('ratings', {
//   id: text('id').primaryKey(),
//   pinId: text('pin_id')
//     .notNull()
//     .references(() => pins.id, { onDelete: 'cascade' }),
//   userId: text('user_id')
//     .notNull()
//     .references(() => users.id),
//   value: integer('value').notNull(), // 1-5
//   createdAt: integer('created_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: integer('updated_at', { mode: 'timestamp' })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// Relations

// export const tagsRelations = relations(tags, ({ many }) => ({
//   pins: many(pinsToTags),
// }));

// export const pinsToTagsRelations = relations(pinsToTags, ({ one }) => ({
//   pin: one(pins, {
//     fields: [pinsToTags.pinId],
//     references: [pins.id],
//   }),
//   tag: one(tags, {
//     fields: [pinsToTags.tagId],
//     references: [tags.id],
//   }),
// }));

// export const mediaRelations = relations(media, ({ one }) => ({
//   pin: one(pins, {
//     fields: [media.pinId],
//     references: [pins.id],
//   }),
//   uploadedBy: one(users, {
//     fields: [media.uploadedById],
//     references: [users.id],
//   }),
// }));

// export const commentsRelations = relations(comments, ({ one }) => ({
//   pin: one(pins, {
//     fields: [comments.pinId],
//     references: [pins.id],
//   }),
//   user: one(users, {
//     fields: [comments.userId],
//     references: [users.id],
//   }),
// }));

// export const visitsRelations = relations(visits, ({ one }) => ({
//   pin: one(pins, {
//     fields: [visits.pinId],
//     references: [pins.id],
//   }),
//   user: one(users, {
//     fields: [visits.userId],
//     references: [users.id],
//   }),
// }));

// export const likesRelations = relations(likes, ({ one }) => ({
//   pin: one(pins, {
//     fields: [likes.pinId],
//     references: [pins.id],
//   }),
//   user: one(users, {
//     fields: [likes.userId],
//     references: [users.id],
//   }),
// }));

// export const ratingsRelations = relations(ratings, ({ one }) => ({
//   pin: one(pins, {
//     fields: [ratings.pinId],
//     references: [pins.id],
//   }),
//   user: one(users, {
//     fields: [ratings.userId],
//     references: [users.id],
//   }),
// }));
