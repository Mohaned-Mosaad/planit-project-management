import { getCurrentUser } from '@/api/services/users'
import usePrepareQuery from '../../usePrepareQuery'

export const useFetchCurrentUser = () => {
  const {
    data: user,
    callApi: fetchCurrentUser,
    isLoading,
  } = usePrepareQuery(getCurrentUser, 'User fetched successfully')

  return {
    user,
    fetchCurrentUser,
    isLoading,
  }
}
