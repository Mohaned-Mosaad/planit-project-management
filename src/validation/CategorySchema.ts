import { z } from 'zod'

export const categorySchema = z.object({
  category: z.string().min(1, { message: 'Category is required' }),
})
