import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  color: text("color").notNull().default("blue"),
});

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  bookId: integer("book_id").notNull(),
  status: text("status").notNull().default("normal"), // normal, completed, difficult, reread
  orderIndex: integer("order_index").notNull().default(0),
});

export const insertBookSchema = createInsertSchema(books).pick({
  title: true,
  color: true,
});

export const insertChapterSchema = createInsertSchema(chapters).pick({
  title: true,
  bookId: true,
  status: true,
  orderIndex: true,
});

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type Chapter = typeof chapters.$inferSelect;

export type BookWithChapters = Book & {
  chapters: Chapter[];
};
