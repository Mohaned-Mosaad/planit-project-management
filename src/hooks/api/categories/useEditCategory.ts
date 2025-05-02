import { updateCategory } from '@/api/services/categories'
import usePrepareQuery from '../../usePrepareQuery'
import useToastEffect from '@/hooks/useToastEffect'
import { useRefresh } from '@/contexts/RefreshContext'
import { useCallback } from 'react'

const useEditCategory = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(updateCategory, 'Category edited successfully')

  const { triggerRefresh } = useRefresh()

  const editCategory = useCallback(
    async (
      ...params: Parameters<typeof callApi>
    ): Promise<ReturnType<typeof callApi>> => {
      const data = await callApi(...params)
      if (data === null) return null
      triggerRefresh('all')
      return data
    },
    [callApi, triggerRefresh]
  )

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    editCategory,
    isLoading,
  }
}

export default useEditCategory
