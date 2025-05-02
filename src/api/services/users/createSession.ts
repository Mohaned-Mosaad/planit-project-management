import { createSessionAppwrite } from '@/appwrite/services/users'

export const createSession = async (email: string, password: string) => {
  return await createSessionAppwrite(email, password)
}
