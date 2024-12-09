import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const students = sqliteTable("students", {
  studentId: text("student_id").notNull().primaryKey(),
});

export const votes = sqliteTable("votes", {
  studentId: text("student_id").notNull(),
  position: text("position").notNull(),
  candidate: text("candidate").notNull(),
});