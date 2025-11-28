CREATE TABLE `pin_visits` (
	`id` text PRIMARY KEY NOT NULL,
	`pin_id` text NOT NULL,
	`user_id` text NOT NULL,
	`visited_at` integer NOT NULL,
	FOREIGN KEY (`pin_id`) REFERENCES `pins`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
