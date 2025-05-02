import { databases } from '@/appwrite/config'
import { COLLECTION_ID_CATEGORIES, DATABASE_ID } from '@/constants/env'
import { RawCategoryDocument } from '@/types/api'

export const updateCategoryAppwrite = async (
  id: string,
  updatedCategory: Partial<RawCategoryDocument>
) => {
  return databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID_CATEGORIES,
    id,
    updatedCategory
  )
}
