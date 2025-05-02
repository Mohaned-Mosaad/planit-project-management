import { RawTaskDocument } from '@/types/api'

import { createTaskAppwrite } from '@/appwrite/services/tasks'
import { mapper } from './mapper'

export const createTask = async (createdTask: RawTaskDocument) => {
  const data = await createTaskAppwrite(createdTask)
  return mapper(data)
}
