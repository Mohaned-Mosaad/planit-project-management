import { useEffect } from 'react'
import { toast } from 'sonner'

export const useToastEffect = (
  errorMessage: string,
  successMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      setErrorMessage('')
    }
    if (successMessage) {
      toast.success(successMessage)
      setSuccessMessage('')
    }
  }, [errorMessage, successMessage, setErrorMessage, setSuccessMessage])
}

export default useToastEffect
