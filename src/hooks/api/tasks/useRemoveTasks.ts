import { deleteTasks } from '@/api/services/tasks'
import usePrepareQuery from '../../usePrepareQuery'
import { useRefresh } from '@/contexts/RefreshContext'
import useToastEffect from '@/hooks/useToastEffect'
import { CategoryDocument, StatusDocument } from '@/types/api'
import { useCallback } from 'react'

const useRemoveTasks = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(deleteTasks, 'All tasks removed successfully')

  const { triggerRefresh } = useRefresh()

  const removeTasks = useCallback(
    async (
      commonData: StatusDocument | CategoryDocument,
      ...params: Parameters<typeof callApi>
    ) => {
      const data = await callApi(...params)
      if (data === null) return null

      if (commonData) {
        triggerRefresh(commonData.$id)
      }
    },
    [callApi, triggerRefresh]
  )

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    removeTasks,
    isLoading,
    successMessage,
  }
}

export default useRemoveTasks
