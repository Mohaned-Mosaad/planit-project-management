import { RawTaskDocument } from '@/types/api'

import { getTasksNumberAppwrite } from '@/appwrite/services/tasks'

export const getTasksNumber = async (
  queryParams?: Partial<RawTaskDocument>
): Promise<number> => {
  const response = await getTasksNumberAppwrite(queryParams)

  return response.total
}
