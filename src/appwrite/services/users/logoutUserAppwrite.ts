import { account } from '@/appwrite/config'

// Logout
export const logoutUserAppwrite = async () => {
  return account.deleteSession('current')
}
