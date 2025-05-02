import { getRecentCategoriesAppwrite } from '@/appwrite/services/categories'
import { CategoryDocument } from '@/types/api'
import { mapper } from './mapper'

export const getRecentCategories = async (): Promise<{
  total: number
  documents: CategoryDocument[]
}> => {
  const response = await getRecentCategoriesAppwrite()

  return {
    total: response.total,
    documents: response.documents.map(mapper),
  }
}
