import { getPaginatedCategoriesAppwrite } from '@/appwrite/services/categories'
import { mapper } from './mapper'

export const getPaginatedCategories = async (page: number, perPage: number) => {
  const response = await getPaginatedCategoriesAppwrite(page, perPage)

  return {
    total: response.total,
    documents: response.documents.map(mapper),
  }
}
