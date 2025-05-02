import useToastEffect from '@/hooks/useToastEffect'
import { usePrepareQuery } from '../../usePrepareQuery'
import { logoutUser } from '@/api/services/users'

export const useLogoutUser = () => {
  const {
    callApi: logout,
    isLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = usePrepareQuery(logoutUser, 'User logged out successfully')

  useToastEffect(error, successMessage, setError, setSuccessMessage)
  return {
    logout,
    isLoading,
  }
}
