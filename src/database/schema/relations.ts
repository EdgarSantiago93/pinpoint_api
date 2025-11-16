import { users } from '@pinpoint/database/schema/userbase';
import { pins } from '@pinpoint/database/schema/pins';
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  pins: many(pins),
  // comments: many(comments),
  // visits: many(visits),
  // likes: many(likes),
  // ratings: many(ratings),
  // media: many(media),
}));

export const pinsRelations = relations(pins, ({ one }) => ({
  createdBy: one(users, {
    fields: [pins.createdById],
    references: [users.id],
  }),
  // media: many(media),
  // comments: many(comments),
  // visits: many(visits),
  // likes: many(likes),
  // ratings: many(ratings),
  // tags: many(pinsToTags),
}));
