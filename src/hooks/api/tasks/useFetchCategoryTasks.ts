import { useSharedData } from '@/contexts/SharedDataContext'
import { CategoryDocument, RawTaskDocument } from '@/types/api'
import { useRefresh } from '@/contexts/RefreshContext'
import { useEffect, useMemo } from 'react'
import useFetchTasks from './useFetchTasks'

export const useFetchCategoryTasks = (categoryObject: CategoryDocument) => {
  const { tasks, isLoading, fetchTasks } = useFetchTasks()

  const { refreshKeys } = useRefresh()

  const { selectedStatusId, ALL_OPTION_ID } = useSharedData()

  const queryParams: Partial<RawTaskDocument> = useMemo(() => {
    return {
      category: categoryObject.$id,
    }
  }, [categoryObject.$id])

  if (selectedStatusId !== ALL_OPTION_ID) {
    queryParams.status = selectedStatusId
  }

  useEffect(() => {
    fetchTasks(queryParams)
  }, [
    refreshKeys.all,
    refreshKeys[categoryObject.$id],
    selectedStatusId,
    fetchTasks,
    queryParams,
  ])

  return {
    tasks,
    isLoading,
  }
}

export default useFetchCategoryTasks
