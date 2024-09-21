import { z } from "zod";

export type Todo = {
  title: string;
  time: string;
};

export const todoSchema = z.object({
  title: z.string().min(3, "title must be at least 3 characters"),
  time: z.string().min(1, "Time is required"),
  status: z.string(),
});
