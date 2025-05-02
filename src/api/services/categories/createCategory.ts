import { createCategoryAppwrite } from '@/appwrite/services/categories'
import { RawCategoryDocument } from '@/types/api'

export const createCategory = async (createdCategory: RawCategoryDocument) => {
  await createCategoryAppwrite(createdCategory)
}
