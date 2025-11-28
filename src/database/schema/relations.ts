import { feedPosts } from '@pinpoint/database/schema/feedposts';
import { pins } from '@pinpoint/database/schema/pins';
import { users } from '@pinpoint/database/schema/userbase';
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  pins: many(pins),
  feedPosts: many(feedPosts),
  // comments: many(comments),
  // visits: many(visits),
  // likes: many(likes),
  // ratings: many(ratings),
  // media: many(media),
}));

export const pinsRelations = relations(pins, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [pins.createdById],
    references: [users.id],
  }),
  feedPosts: many(feedPosts),
  // media: many(media),
  // comments: many(comments),
  // visits: many(visits),
  // likes: many(likes),
  // ratings: many(ratings),
  // tags: many(pinsToTags),
}));

export const feedPostsRelations = relations(feedPosts, ({ one }) => ({
  place: one(pins, {
    fields: [feedPosts.placeId],
    references: [pins.id],
  }),
  user: one(users, {
    fields: [feedPosts.userId],
    references: [users.id],
  }),
}));
