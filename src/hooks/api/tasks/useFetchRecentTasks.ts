import { getRecentTasks } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'
import { useEffect } from 'react'
import { useRefresh } from '@/contexts/RefreshContext'

export const useFetchRecentTasks = () => {
  const {
    data: tasks,
    callApi: fetchTasks,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(getRecentTasks, 'recent tasks fetched successfully')

  const { refreshKeys } = useRefresh()

  useEffect(() => {
    fetchTasks()
  }, [refreshKeys.all, fetchTasks])

  return {
    tasks,
    fetchTasks,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  }
}

export default useFetchRecentTasks
