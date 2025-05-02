import { registerUserAppwrite } from '@/appwrite/services/users'
import { RawUserDocument, UserDocument } from '@/types/api/UserDocument'
import { mapper } from './mapper'

export const registerUser = async (
  createdUser: RawUserDocument
): Promise<UserDocument> => {
  const response = await registerUserAppwrite(
    createdUser.email,
    createdUser.password,
    createdUser.name
  )

  return mapper(response)
}
