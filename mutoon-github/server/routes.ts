import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Workbooks
  app.get(api.workbooks.list.path, async (req, res) => {
    const workbooks = await storage.getWorkbooks();
    res.json(workbooks);
  });

  app.get(api.workbooks.get.path, async (req, res) => {
    const workbook = await storage.getWorkbook(Number(req.params.id));
    if (!workbook) {
      return res.status(404).json({ message: 'Workbook not found' });
    }
    res.json(workbook);
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const request = await storage.createContactRequest(input);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  await storage.seedWorkbooks();

  return httpServer;
}
