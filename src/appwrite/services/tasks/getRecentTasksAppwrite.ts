import { databases } from '@/appwrite/config'
import { COLLECTION_ID_TASKS, DATABASE_ID } from '@/constants/env'
import { Query } from 'appwrite'

export const getRecentTasksAppwrite = async () => {
  const queries = [Query.orderDesc('$createdAt'), Query.limit(5)].filter(
    Boolean
  )

  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_TASKS, queries)
}
