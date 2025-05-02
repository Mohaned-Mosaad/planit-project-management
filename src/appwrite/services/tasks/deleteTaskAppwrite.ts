import { databases } from '@/appwrite/config'
import { COLLECTION_ID_TASKS, DATABASE_ID } from '@/constants/env'

export const deleteTaskAppwrite = async (taskId: string) => {
  return databases.deleteDocument(DATABASE_ID, COLLECTION_ID_TASKS, taskId)
}
