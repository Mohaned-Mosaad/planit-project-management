import { getTasks } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'

export const useFetchTasks = () => {
  const {
    data: tasks,
    callApi: fetchTasks,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(getTasks, 'Tasks fetched successfully')

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

export default useFetchTasks
