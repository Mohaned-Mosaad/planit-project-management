import { deleteCategoryAppwrite } from '@/appwrite/services/categories'

export const deleteCategory = async (id: string): Promise<void> => {
  await deleteCategoryAppwrite(id)
}
