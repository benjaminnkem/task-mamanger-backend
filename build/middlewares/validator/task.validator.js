import { z } from "zod";
export const createTaskSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }).trim(),
        description: z.string(),
        category: z.string(),
        dueDate: z.date(),
        status: z.string(),
        userId: z.string(),
    }),
});
