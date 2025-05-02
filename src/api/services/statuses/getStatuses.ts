import { StatusDocument } from '@/types/api'

import { getStatusesAppwrite } from '@/appwrite/services/statuses'
import { mapper } from './mapper'

export const getStatuses = async (): Promise<{
  total: number
  documents: StatusDocument[]
}> => {
  const response = await getStatusesAppwrite()

  return {
    total: response.total,
    documents: response.documents.map(mapper),
  }
}
