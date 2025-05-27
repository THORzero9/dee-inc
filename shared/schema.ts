import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Photos table
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  category: text("category").notNull(), // dates, trips, everyday, special
  date: timestamp("date", { mode: 'string' }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPhotoSchema = createInsertSchema(photos).omit({
  id: true,
  createdAt: true,
});

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;

// Special Moments table
export const moments = pgTable("moments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  date: timestamp("date", { mode: 'string' }).notNull(),
  tag: text("tag").notNull(), // First Date, Anniversary, Travel, Celebration
  tagColor: text("tag_color").notNull(), // primary, secondary, accent, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMomentSchema = createInsertSchema(moments).omit({
  id: true,
  createdAt: true,
});

export type InsertMoment = z.infer<typeof insertMomentSchema>;
export type Moment = typeof moments.$inferSelect;

// Users table (keeping from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
