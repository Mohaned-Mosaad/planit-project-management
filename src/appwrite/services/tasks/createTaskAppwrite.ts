import { RawTaskDocument } from '@/types/api'

import { account, databases } from '@/appwrite/config'
import {
  COLLECTION_ID_CATEGORIES,
  COLLECTION_ID_STATUSES,
  COLLECTION_ID_TASKS,
  DATABASE_ID,
} from '@/constants/env'
import { ID, Role, Permission, AppwriteException } from 'appwrite'

export const createTaskAppwrite = async (createdTask: RawTaskDocument) => {
  if (!createdTask.content) {
    throw new Error('Content is required')
  }
  if (!createdTask.category) {
    throw new Error('Category is required')
  }
  if (!createdTask.status) {
    throw new Error('Status is required')
  }

  const response1 = await databases.getDocument(
    DATABASE_ID,
    COLLECTION_ID_STATUSES,
    createdTask.status
  )
  if (response1.$id !== createdTask.status) {
    throw new AppwriteException('Chosen status does not exist')
  }

  const response2 = await databases.getDocument(
    DATABASE_ID,
    COLLECTION_ID_CATEGORIES,
    createdTask.category
  )
  if (response2.$id !== createdTask.category) {
    throw new AppwriteException('Chosen category does not exist')
  }

  const userId = (await account.get()).$id

  return databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID_TASKS,
    ID.unique(),
    createdTask,
    [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ]
  )
}
