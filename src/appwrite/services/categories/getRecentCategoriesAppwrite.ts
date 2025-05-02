import { databases } from '@/appwrite/config'
import { COLLECTION_ID_CATEGORIES, DATABASE_ID } from '@/constants/env'
import { Query } from 'appwrite'

export const getRecentCategoriesAppwrite = async () => {
  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_CATEGORIES, [
    Query.orderDesc('$createdAt'),
    Query.limit(5),
  ])
}
