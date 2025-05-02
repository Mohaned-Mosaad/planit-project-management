import { account } from '@/appwrite/config'
import { ID } from 'appwrite'

// Register
export const registerUserAppwrite = async (
  email: string,
  password: string,
  name: string
) => {
  return account.create(ID.unique(), email, password, name)
}
