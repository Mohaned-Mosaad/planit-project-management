import { RawTaskDocument } from '@/types/api'

import { databases } from '@/appwrite/config'
import { COLLECTION_ID_TASKS, DATABASE_ID } from '@/constants/env'

export const updateTaskAppwrite = async (
  id: string,
  updatedTask: Partial<RawTaskDocument>
) => {
  return databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID_TASKS,
    id,
    updatedTask
  )
}
