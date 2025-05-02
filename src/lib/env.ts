import { EnvVar } from '@/vite-env'

export const getEnv = (key: EnvVar, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`)
  }

  return value
}
