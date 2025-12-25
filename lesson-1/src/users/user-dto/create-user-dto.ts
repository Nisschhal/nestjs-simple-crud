import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email('Invalid email address'),
  role: z.enum(['ADMIN', 'USER']),
});

export type CreateUserDto = z.infer<typeof userSchema>;
