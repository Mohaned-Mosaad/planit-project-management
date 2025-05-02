import { getStatuses } from '@/api/services/statuses'
import usePrepareQuery from '../../usePrepareQuery'
import { useRefresh } from '@/contexts/RefreshContext'
import { useEffect } from 'react'

export const useFetchStatuses = () => {
  const {
    data: statuses,
    callApi: fetchStatuses,
    isLoading,
  } = usePrepareQuery(getStatuses, 'Statuses fetched successfully')

  const { refreshKeys, registerKeys } = useRefresh()

  useEffect(() => {
    fetchStatuses()
  }, [refreshKeys.all, fetchStatuses])

  useEffect(() => {
    if (statuses) {
      registerKeys(statuses.documents)
    }
  }, [statuses, registerKeys])

  return {
    statuses,
    isLoading,
  }
}

export default useFetchStatuses
