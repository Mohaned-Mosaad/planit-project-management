import { databases } from '@/appwrite/config'
import { COLLECTION_ID_CATEGORIES, DATABASE_ID } from '@/constants/env'

export const getCategoriesAppwrite = async () => {
  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_CATEGORIES)
}
