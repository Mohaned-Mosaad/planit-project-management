import { updateTask } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'
import useToastEffect from '@/hooks/useToastEffect'
import { useRefresh } from '@/contexts/RefreshContext'
import { TaskDocument } from '@/types/api'
import { useCallback } from 'react'

const useEditTask = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(updateTask, 'Task edited successfully')

  const { triggerRefresh } = useRefresh()

  const editTask = useCallback(
    async (
      oldTask: TaskDocument,
      ...params: Parameters<typeof callApi>
    ): Promise<ReturnType<typeof callApi>> => {
      const data = await callApi(...params)
      if (data === null) return null

      const categoryChanges = data.category.$id !== oldTask.category.$id
      const statusChanges = data.status.$id !== oldTask.status.$id

      if (statusChanges) {
        triggerRefresh(data.status.$id)
        triggerRefresh(oldTask.status.$id)
      }

      if (categoryChanges) {
        triggerRefresh(data.category.$id)
        triggerRefresh(oldTask.category.$id)
      }

      if (!categoryChanges && !statusChanges) {
        triggerRefresh(oldTask.status.$id)
        triggerRefresh(oldTask.category.$id)
      }

      return data
    },
    [callApi, triggerRefresh]
  )

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    editTask,
    isLoading,
  }
}

export default useEditTask
