import { databases } from '@/appwrite/config'
import { COLLECTION_ID_STATUSES, DATABASE_ID } from '@/constants/env'

export const getStatusesAppwrite = async () => {
  return databases.listDocuments(DATABASE_ID, COLLECTION_ID_STATUSES)
}
