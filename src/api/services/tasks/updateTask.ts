import { RawTaskDocument } from '@/types/api'

import { updateTaskAppwrite } from '@/appwrite/services/tasks'
import { mapper } from './mapper'

export const updateTask = async (
  id: string,
  updatedTask: Partial<RawTaskDocument>
) => {
  const data = await updateTaskAppwrite(id, updatedTask)

  return mapper(data)
}
