import { getTasksNumber } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'
import { useRefresh } from '@/contexts/RefreshContext'
import { useEffect } from 'react'
import { RawTaskDocument } from '@/types/api'

export const useFetchTasksNumber = (queryParams?: Partial<RawTaskDocument>) => {
  const {
    data: tasksNumber,
    callApi: fetchTasksNumber,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(getTasksNumber, 'Tasks count fetched successfully')

  const { refreshKeys } = useRefresh()

  useEffect(() => {
    fetchTasksNumber(queryParams)
  }, [refreshKeys.all, fetchTasksNumber, queryParams])

  return {
    tasksNumber,
    fetchTasksNumber,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  }
}

export default useFetchTasksNumber
