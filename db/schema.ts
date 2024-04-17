import { relations } from "drizzle-orm";
import {
  primaryKey,
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

export const WorkSpaceTable = pgTable("workspace", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => UserTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const WorkSpaceMembersTable = pgTable(
  "workspace_members",
  {
    userId: text("user_id")
      .notNull()
      .references(() => UserTable.id),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => WorkSpaceTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.workspaceId] }),
  })
);

export const usersRelations = relations(UserTable, ({ many }) => ({
  workspaces: many(WorkSpaceTable),
  workspaceMembers: many(WorkSpaceMembersTable),
}));

export const workSpaceRelations = relations(
  WorkSpaceTable,
  ({ one, many }) => ({
    owner: one(UserTable, {
      fields: [WorkSpaceTable.ownerId],
      references: [UserTable.id],
    }),
    members: many(WorkSpaceMembersTable),
  })
);

export const workspaceMembersRelations = relations(
  WorkSpaceMembersTable,
  ({ one }) => ({
    workspace: one(WorkSpaceTable, {
      fields: [WorkSpaceMembersTable.workspaceId],
      references: [WorkSpaceTable.id],
    }),
    user: one(UserTable, {
      fields: [WorkSpaceMembersTable.userId],
      references: [UserTable.id],
    }),
  })
);
