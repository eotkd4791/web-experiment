CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"state" varchar(10) DEFAULT 'open' NOT NULL
);
