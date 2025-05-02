import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters' }),
    lastName: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters' }),
    email: z.string().email({ message: 'Invalid email structure' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(32, {
        message: 'Password must be at most 32 characters',
      })
      .regex(/(?=.*?[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/(?=.*?[a-z])/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/(?=.*?\d)/, {
        message: 'Password must contain at least one number',
      })
      .regex(/(?=.*?[#?!@$%^&*-])/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
