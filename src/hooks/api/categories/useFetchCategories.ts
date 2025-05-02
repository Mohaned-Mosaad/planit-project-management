import { getCategories } from '@/api/services/categories'
import usePrepareQuery from '../../usePrepareQuery'
import { useEffect } from 'react'
import { useRefresh } from '@/contexts/RefreshContext'

export const useFetchCategories = () => {
  const {
    data: categories,
    setData: setCategories,
    callApi: fetchCategories,
    isLoading,
  } = usePrepareQuery(getCategories, 'Categories fetched successfully')

  const { refreshKeys, registerKeys } = useRefresh()

  useEffect(() => {
    fetchCategories()
  }, [refreshKeys.all, fetchCategories])

  useEffect(() => {
    if (categories) {
      registerKeys(categories.documents)
    }
  }, [categories, registerKeys])

  return {
    categories,
    setCategories,
    fetchCategories,
    isLoading,
  }
}

export default useFetchCategories
