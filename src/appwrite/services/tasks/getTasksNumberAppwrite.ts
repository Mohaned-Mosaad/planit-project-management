import { RawTaskDocument } from '@/types/api'

import { databases } from '@/appwrite/config'
import { COLLECTION_ID_TASKS, DATABASE_ID } from '@/constants/env'
import { Query } from 'appwrite'

export const getTasksNumberAppwrite = async (
  queryParams?: Partial<RawTaskDocument>
) => {
  const queries = [
    queryParams?.status && Query.equal('status', queryParams.status),
    queryParams?.category && Query.equal('category', queryParams.category),
    Query.limit(1),
  ].filter(Boolean) as string[]

  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_TASKS, queries)
}
