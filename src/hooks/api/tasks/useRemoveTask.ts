import { deleteTask } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'
import { useRefresh } from '@/contexts/RefreshContext'
import useToastEffect from '@/hooks/useToastEffect'
import { TaskDocument } from '@/types/api'
import { useCallback } from 'react'

const useRemoveTask = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(deleteTask, 'Task removed successfully')

  const { triggerRefresh } = useRefresh()

  const removeTask = useCallback(
    async (
      task: TaskDocument,
      ...params: Parameters<typeof callApi>
    ): Promise<ReturnType<typeof callApi>> => {
      const data = await callApi(...params)
      if (data === null) return null

      triggerRefresh(task.category.$id)
      triggerRefresh(task.status.$id)
    },
    [callApi, triggerRefresh]
  )

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    removeTask,
    isLoading,
  }
}

export default useRemoveTask
