ALTER TABLE `tags` RENAME COLUMN "name" TO "key";--> statement-breakpoint
DROP INDEX `tags_name_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `tags_key_unique` ON `tags` (`key`);