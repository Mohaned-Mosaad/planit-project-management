import { z } from 'zod'

export const taskSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
})
