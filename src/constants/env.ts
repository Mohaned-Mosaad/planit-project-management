import { getEnv } from '@/lib/env'

export const ENDPOINT = getEnv('VITE_ENDPOINT')
export const DATABASE_ID = getEnv('VITE_DATABASE_ID')
export const PROJECT_ID = getEnv('VITE_PROJECT_ID')

// collections
export const COLLECTION_ID_CATEGORIES = getEnv('VITE_COLLECTION_ID_CATEGORIES')
export const COLLECTION_ID_STATUSES = getEnv('VITE_COLLECTION_ID_STATUSES')
export const COLLECTION_ID_TASKS = getEnv('VITE_COLLECTION_ID_TASKS')
