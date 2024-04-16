import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import {
  serial,
  text,
  timestamp,
  pgTable,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  hashedPassword: text("hashed_password"),
  isEmailVerified: boolean("is_email_verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const EmailVerificationTable = pgTable("email_verification", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .references(() => UserTable.id)
    .notNull(),
  code: text("code").notNull(),
});

export const SessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => UserTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
