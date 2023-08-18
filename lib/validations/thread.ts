import * as z from "zod";

export const ThreadValidation = z.object({
  threadImage: z.string().url().optional(), 
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  threadImage: z.string().url(), 
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});