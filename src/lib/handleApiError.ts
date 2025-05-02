import { AppwriteException } from 'appwrite'
import { AxiosError } from 'axios'

export const handleApiError = (
  error: unknown,
  setError: (message: string) => void
) => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message
    setError(errorMessage)
  } else if (error instanceof AppwriteException) {
    setError(error.message)
  } else if (error instanceof Error) {
    setError(error.message)
  } else {
    setError('An unexpected error occurred')
  }
}
