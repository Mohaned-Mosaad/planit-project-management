import { deleteTaskAppwrite } from '@/appwrite/services/tasks'

export const deleteTask = async (id: string): Promise<void> => {
  await deleteTaskAppwrite(id)
}
