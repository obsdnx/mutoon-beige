import { db } from "./db";
import {
  workbooks,
  contactRequests,
  type Workbook,
  type InsertWorkbook,
  type InsertContactRequest,
  type ContactRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getWorkbooks(): Promise<Workbook[]>;
  getWorkbook(id: number): Promise<Workbook | undefined>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  seedWorkbooks(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getWorkbooks(): Promise<Workbook[]> {
    return await db.select().from(workbooks);
  }

  async getWorkbook(id: number): Promise<Workbook | undefined> {
    const [workbook] = await db.select().from(workbooks).where(eq(workbooks.id, id));
    return workbook;
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const [newRequest] = await db.insert(contactRequests).values(request).returning();
    return newRequest;
  }

  async seedWorkbooks(): Promise<void> {
    const allWorkbooks: InsertWorkbook[] = [
      {
        title: "Glorification of Knowledge",
        arabicTitle: "تعظيم العلم",
        description: "A comprehensive guide to the etiquettes and virtues of seeking Islamic knowledge.",
        coverImage: "https://placehold.co/400x600/0a1628/c9a962?text=Glorification+of+Knowledge",
        price: 1500,
        isFeatured: true,
        amazonLink: "https://www.amazon.co.uk/dp/191928012X"
      },
      {
        title: "The Three Principles",
        arabicTitle: "ثلاثة الأصول",
        description: "Fundamental principles of faith every Muslim should know.",
        coverImage: "https://placehold.co/400x600/0a1628/c9a962?text=The+Three+Principles",
        price: 1200,
        isFeatured: true,
        amazonLink: "https://www.amazon.co.uk/dp/1919280138"
      },
      {
        title: "The Four Principles",
        arabicTitle: "القواعد الأربع",
        description: "Essential rules for understanding Tawheed and avoiding Shirk.",
        coverImage: "https://placehold.co/400x600/0a1628/c9a962?text=The+Four+Principles",
        price: 1000,
        isFeatured: true,
        amazonLink: null
      },
      {
        title: "Nullifiers of Islam",
        arabicTitle: "نواقض الإسلام",
        description: "A study of the ten actions that nullify a person's Islam, based on the work of Imam Muhammad ibn Abd al-Wahhab.",
        coverImage: "https://placehold.co/400x600/0a1628/c9a962?text=Nullifiers+of+Islam",
        price: 1000,
        isFeatured: true,
        amazonLink: null
      },
      {
        title: "40 Hadith Nawawi",
        arabicTitle: "الأربعين النووية",
        description: "A collection of forty fundamental hadiths compiled by Imam An-Nawawi covering the foundations of Islamic practice and belief.",
        coverImage: "https://placehold.co/400x600/0a1628/c9a962?text=40+Hadith+Nawawi",
        price: 1200,
        isFeatured: true,
        amazonLink: null
      }
    ];

    const existing = await this.getWorkbooks();
    const existingTitles = new Set(existing.map(w => w.title));
    const missing = allWorkbooks.filter(w => !existingTitles.has(w.title));

    if (missing.length > 0) {
      await db.insert(workbooks).values(missing);
    }
  }
}

export const storage = new DatabaseStorage();
