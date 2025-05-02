import { handleApiError } from '@/lib/handleApiError'
import { useCallback, useState } from 'react'

export const usePrepareQuery = <TParams extends unknown[], TResult>(
  callApiFn: (...args: TParams) => Promise<TResult>,
  successMsg: string
) => {
  const [data, setData] = useState<TResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const callApi = useCallback(
    async (
      ...params: TParams
    ): Promise<TResult | null> => {
      setError('')
      setSuccessMessage('')

      try {
        setIsLoading(true)
        const data = await callApiFn(...params)
        setData(data)
        setSuccessMessage(successMsg)
        return data
      } catch (error) {
        handleApiError(error, setError)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [callApiFn, successMsg]
  )

  return {
    data,
    setData,
    callApi,
    isLoading,
    successMessage,
    setSuccessMessage,
    error,
    setError,
  }
}

export default usePrepareQuery
