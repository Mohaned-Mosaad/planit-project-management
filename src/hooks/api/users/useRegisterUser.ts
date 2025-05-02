import useToastEffect from '@/hooks/useToastEffect'
import usePrepareQuery from '../../usePrepareQuery'
import { registerUser } from '@/api/services/users'

export const useRegisterUser = () => {
  const {
    data: user,
    callApi: register,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(registerUser, 'User registered successfully')

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    user,
    register,
    isLoading,
  }
}
