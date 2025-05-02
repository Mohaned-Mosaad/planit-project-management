import { useState, useCallback } from 'react'
import Cookies from 'js-cookie'
import { useAuth } from '@/contexts/AuthContext'

export function usePersistedState<T>(
  initialValue: T,
  key: string,
  options?: { cookieMaxAge?: number } // seconds
) {
  const { user } = useAuth()
  const cookieMaxAge = options?.cookieMaxAge ?? 60 * 60 * 24 * 7 // 1 week default

  const cookieKey = `${user?.$id}_${key}`
  const stored = Cookies.get(cookieKey)
  let parsed: T = initialValue

  if (stored !== undefined) {
    try {
      parsed = JSON.parse(stored)
    } catch {
      parsed = stored as unknown as T
    }
  }

  const [_value, _setValue] = useState<T>(parsed)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      _setValue((prev) => {
        const newValue =
          typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
        Cookies.set(cookieKey, JSON.stringify(newValue), {
          path: '/',
          expires: cookieMaxAge / (60 * 60 * 24), // seconds -> days
        })
        return newValue
      })
    },
    [cookieMaxAge, cookieKey]
  )

  return [_value, setValue] as const
}
