import { updateCategoryAppwrite } from '@/appwrite/services/categories'
import { RawCategoryDocument } from '@/types/api'
import { mapper } from './mapper'

export const updateCategory = async (
  id: string,
  updatedCategory: Partial<RawCategoryDocument>
) => {
  const data = await updateCategoryAppwrite(id, updatedCategory)
  return mapper(data)
}
