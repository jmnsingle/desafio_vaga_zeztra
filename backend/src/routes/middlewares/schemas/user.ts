import { z } from 'zod';

const userRequest = z.object({
  name: z.string().min(2),
  document: z.string().min(11).max(14),
});

export type UserInput = z.infer<typeof userRequest>;

export const usersSchema = z.object({
  body: userRequest,
});
