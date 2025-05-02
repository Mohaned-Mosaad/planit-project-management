import { getPaginatedCategories } from '@/api/services/categories'
import usePrepareQuery from '../../usePrepareQuery'
import { useEffect, useState } from 'react'
import { useRefresh } from '@/contexts/RefreshContext'

export const useFetchPaginatedCategories = () => {
  const {
    data: categories,
    callApi: fetchCategories,
    isLoading,
  } = usePrepareQuery(getPaginatedCategories, 'categories fetched successfully')

  const categoriesPerPage = 4
  const [page, setPage] = useState(1)

  const { refreshKeys, registerKeys } = useRefresh()

  useEffect(() => {
    fetchCategories(page, categoriesPerPage)
  }, [refreshKeys.all, page, categoriesPerPage, fetchCategories])

  useEffect(() => {
    if (categories) {
      registerKeys(categories.documents)
    }
  }, [categories, registerKeys])

  return {
    categories,
    fetchCategories,
    isLoading,
    categoriesPerPage,
    page,
    setPage,
  }
}
