import { deleteCategory } from '@/api/services/categories'
import usePrepareQuery from '../../usePrepareQuery'
import useToastEffect from '@/hooks/useToastEffect'
import { useRefresh } from '@/contexts/RefreshContext'

const useRemoveCategory = () => {
  const {
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(deleteCategory, 'Category removed successfully')

  const { triggerRefresh } = useRefresh()

  const removeCategory = async (
    ...params: Parameters<typeof callApi>
  ): Promise<ReturnType<typeof callApi>> => {
    const data = await callApi(...params)
    if (data === null) return null
    triggerRefresh('all')
  }

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    removeCategory,
    isLoading,
  }
}

export default useRemoveCategory
