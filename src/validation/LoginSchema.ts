import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email should not be empty' })
    .email({ message: 'invalid email structure' }),
  password: z.string().min(1, { message: 'password should not be empty' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
