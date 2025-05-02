/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string
  readonly VITE_PROJECT_ID: string
  readonly VITE_DATABASE_ID: string
  readonly VITE_COLLECTION_ID_CATEGORIES: string
  readonly VITE_COLLECTION_ID_STATUSES: string
  readonly VITE_COLLECTION_ID_TASKS: string
}

export type EnvVar = keyof ImportMetaEnv


interface ImportMeta {
  readonly env: ImportMetaEnv
}
