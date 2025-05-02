import { useSharedData } from '@/contexts/SharedDataContext'
import { RawTaskDocument, StatusDocument } from '@/types/api'
import { useRefresh } from '@/contexts/RefreshContext'
import { useEffect, useMemo } from 'react'
import useFetchTasks from './useFetchTasks'

export const useFetchStatusTasks = (statusObject: StatusDocument) => {
  const { tasks, isLoading, fetchTasks } = useFetchTasks()

  const { selectedCategoryId, ALL_OPTION_ID } = useSharedData()

  const { refreshKeys } = useRefresh()
  const queryParams: Partial<RawTaskDocument> = useMemo(
    () => ({
      status: statusObject.$id,
    }),
    [statusObject.$id]
  )

  if (selectedCategoryId && selectedCategoryId !== ALL_OPTION_ID) {
    queryParams.category = selectedCategoryId
  }

  useEffect(() => {
    fetchTasks(queryParams)
  }, [
    refreshKeys[statusObject.$id],
    refreshKeys.all,
    selectedCategoryId,
    fetchTasks,
    queryParams,
  ])

  return {
    tasks,
    isLoading,
  }
}

export default useFetchStatusTasks
