import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const workbooks = pgTable("workbooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  arabicTitle: text("arabic_title").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  price: integer("price"),
  isFeatured: boolean("is_featured").default(true),
  amazonLink: text("amazon_link"),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(), // 'individual' or 'institution'
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertWorkbookSchema = createInsertSchema(workbooks).omit({ id: true });
export const insertContactRequestSchema = createInsertSchema(contactRequests)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(1, "Name is required").max(200),
    email: z.string().email("Please enter a valid email address"),
    type: z.enum(["individual", "institution", "bookstore"], { required_error: "Please select a type" }),
    message: z.string().min(1, "Message is required").max(5000),
  });

// === TYPES ===
export type Workbook = typeof workbooks.$inferSelect;
export type InsertWorkbook = z.infer<typeof insertWorkbookSchema>;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
