import { account, databases } from '@/appwrite/config'
import { COLLECTION_ID_CATEGORIES, DATABASE_ID } from '@/constants/env'
import { RawCategoryDocument } from '@/types/api'
import { ID, Permission, Role } from 'appwrite'

export const createCategoryAppwrite = async (
  createdCategory: RawCategoryDocument
) => {
  if (!createdCategory.category) {
    throw new Error('Category name is required')
  }
  const userId = (await account.get()).$id

  return databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID_CATEGORIES,
    ID.unique(),
    createdCategory,
    [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ]
  )
}
