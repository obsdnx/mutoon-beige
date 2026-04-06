import { z } from 'zod';
import { insertContactRequestSchema, insertWorkbookSchema, workbooks, contactRequests } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  workbooks: {
    list: {
      method: 'GET' as const,
      path: '/api/workbooks',
      responses: {
        200: z.array(z.custom<typeof workbooks.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/workbooks/:id',
      responses: {
        200: z.custom<typeof workbooks.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactRequestSchema,
      responses: {
        201: z.custom<typeof contactRequests.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
