import { TaskDocument } from '@/types/api'

import { mapper } from './mapper'
import { getRecentTasksAppwrite } from '@/appwrite/services/tasks'

export const getRecentTasks = async (): Promise<{
  total: number
  documents: TaskDocument[]
}> => {
  const response = await getRecentTasksAppwrite()

  return {
    total: response.total,
    documents: response.documents.map(mapper),
  }
}
