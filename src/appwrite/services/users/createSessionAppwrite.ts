import { account } from '@/appwrite/config'

export const createSessionAppwrite = async (
  email: string,
  password: string
) => {
  await account.createEmailPasswordSession(email, password)
}
