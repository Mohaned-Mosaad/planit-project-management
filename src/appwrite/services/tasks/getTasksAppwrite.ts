import { RawTaskDocument } from '@/types/api'
import { COLLECTION_ID_TASKS, DATABASE_ID } from '@/constants/env'

import { databases } from '@/appwrite/config'
import { Query } from 'appwrite'

export const getTasksAppwrite = async (
  queryParams?: Partial<RawTaskDocument>
) => {
  const queries = [
    queryParams?.status && Query.equal('status', queryParams.status),
    queryParams?.category && Query.equal('category', queryParams.category),
    Query.orderDesc('$createdAt'),
  ].filter(Boolean) as string[]

  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_TASKS, queries)
}
