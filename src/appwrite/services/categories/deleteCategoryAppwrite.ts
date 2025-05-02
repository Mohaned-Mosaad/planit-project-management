import { databases } from '@/appwrite/config'
import { COLLECTION_ID_CATEGORIES, DATABASE_ID } from '@/constants/env'

export const deleteCategoryAppwrite = async (categoryId: string) => {
  return databases.deleteDocument(
    DATABASE_ID,
    COLLECTION_ID_CATEGORIES,
    categoryId
  )
}
