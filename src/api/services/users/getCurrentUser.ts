import { getCurrentUserAppwrite } from '@/appwrite/services/users'
import { UserDocument } from '@/types/api'
import { mapper } from './mapper'

export const getCurrentUser = async (): Promise<UserDocument> => {
  const response = await getCurrentUserAppwrite()

  return mapper(response)
}
