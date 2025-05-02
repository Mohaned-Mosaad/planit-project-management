import { CategoryDocument } from '@/types/api'
import { getCategoriesAppwrite } from '@/appwrite/services/categories'

import { mapper } from './mapper'

export const getCategories = async (): Promise<{
  total: number
  documents: CategoryDocument[]
}> => {
  const response = await getCategoriesAppwrite()

  return {
    total: response.total,
    documents: response.documents.map(mapper),
  }
}
