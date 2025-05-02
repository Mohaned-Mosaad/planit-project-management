import { createTask } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'
import { useRefresh } from '@/contexts/RefreshContext'
import useToastEffect from '@/hooks/useToastEffect'
import { useCallback } from 'react'

const useAddTask = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(createTask, 'Task added successfully')

  const { triggerRefresh } = useRefresh()

  const addTask = useCallback(
    async (
      ...params: Parameters<typeof callApi>
    ): Promise<ReturnType<typeof callApi>> => {
      const data = await callApi(...params)
      if (data === null) return null

      triggerRefresh(data.category.$id)
      triggerRefresh(data.status.$id)
      return data
    },
    [callApi, triggerRefresh]
  )

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    addTask,
    isLoading,
  }
}

export default useAddTask
