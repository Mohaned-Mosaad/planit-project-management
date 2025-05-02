import { account } from '@/appwrite/config'

export const getCurrentUserAppwrite = async () => {
  return await account.get()
}
