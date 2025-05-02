import { createCategory } from '@/api/services/categories'
import usePrepareQuery from '../../usePrepareQuery'
import useToastEffect from '@/hooks/useToastEffect'
import { useRefresh } from '@/contexts/RefreshContext'
import { useCallback } from 'react'

const useAddCategory = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(createCategory, 'category added successfully')

  const { triggerRefresh } = useRefresh()

  const addCategory = useCallback(
    async (
      ...params: Parameters<typeof callApi>
    ): Promise<ReturnType<typeof callApi>> => {
      const data = await callApi(...params)
      if (data === null) return null
      triggerRefresh('all')
    },
    [callApi, triggerRefresh]
  )

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    addCategory,
    isLoading,
  }
}

export default useAddCategory
