import { getRecentCategories } from '@/api/services/categories'
import usePrepareQuery from '../../usePrepareQuery'
import { useRefresh } from '@/contexts/RefreshContext'
import { useEffect } from 'react'

export const useFetchRecentCategories = () => {
  const {
    data: categories,
    setData: setCategories,
    callApi: fetchCategories,
    isLoading,
  } = usePrepareQuery(
    getRecentCategories,
    'Recent categories fetched successfully'
  )

  const { refreshKeys } = useRefresh()

  useEffect(() => {
    fetchCategories()
  }, [refreshKeys.all, fetchCategories])

  return {
    categories,
    setCategories,
    fetchCategories,
    isLoading,
  }
}

export default useFetchRecentCategories
