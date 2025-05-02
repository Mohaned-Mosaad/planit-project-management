import useToastEffect from '@/hooks/useToastEffect'
import usePrepareQuery from '../../usePrepareQuery'
import { createSession } from '@/api/services/users'

export const useCreateSession = () => {
  const {
    callApi: createUserSession,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  } = usePrepareQuery(createSession, 'User logged in successfully')

  useToastEffect(error, successMessage, setError, setSuccessMessage)

  return {
    createUserSession,
    isLoading,
  }
}
