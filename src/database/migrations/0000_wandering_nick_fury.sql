CREATE TABLE `pins` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`label` text,
	`address` text,
	`latitude` real,
	`longitude` real,
	`category` text,
	`rating` real,
	`color` text,
	`url` text,
	`created_by_id` text NOT NULL,
	`is_deleted` integer DEFAULT 0 NOT NULL,
	`deleted_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`name` text,
	`bio` text,
	`avatar` text DEFAULT '',
	`role` text DEFAULT 'USER' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`is_deleted` integer DEFAULT 0 NOT NULL,
	`deleted_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);