import { logoutUserAppwrite } from '@/appwrite/services/users'

export const logoutUser = async () => {
  await logoutUserAppwrite()
}
