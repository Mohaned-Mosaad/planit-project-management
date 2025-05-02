import { databases } from '@/appwrite/config'
import { COLLECTION_ID_CATEGORIES, DATABASE_ID } from '@/constants/env'
import { Query } from 'appwrite'

export const getPaginatedCategoriesAppwrite = async (
  page: number,
  perPage: number
) => {
  const queries = [Query.limit(perPage), Query.offset((page - 1) * perPage)]
  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_CATEGORIES, queries)
}
