import { RawTaskDocument, TaskDocument } from '@/types/api'

import { mapper } from './mapper'
import { getTasksAppwrite } from '@/appwrite/services/tasks'

export const getTasks = async (
  queryParams?: Partial<RawTaskDocument>
): Promise<{ total: number; documents: TaskDocument[] }> => {
  const response = await getTasksAppwrite(queryParams)

  return {
    total: response.total,
    documents: response.documents.map(mapper),
  }
}
