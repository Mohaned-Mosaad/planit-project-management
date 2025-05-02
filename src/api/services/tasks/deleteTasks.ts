import { deleteTask } from './deleteTask'

export const deleteTasks = async (ids: string[]): Promise<void> => {
  await Promise.all(ids.map((id) => deleteTask(id)))
}
