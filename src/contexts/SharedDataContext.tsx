import { useFetchCategories } from '@/hooks/api/categories'
import useFetchStatuses from '@/hooks/api/statuses/useFetchStatuses'
import { usePersistedState } from '@/hooks/usePersistedState'
import { CategoryDocument, StatusDocument } from '@/types/api'

import React, { useContext } from 'react'

type ContextType = {
  statuses: {
    total: number
    documents: StatusDocument[]
  } | null
  categories: {
    total: number
    documents: CategoryDocument[]
  } | null
  selectedStatusId: string
  selectedCategoryId: string
  setSelectedStatusId: React.Dispatch<React.SetStateAction<string>>
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>
  isCategoriesLoading: boolean
  isStatusesLoading: boolean

  ALL_OPTION_ID: string
}

const SharedDataContext = React.createContext<ContextType | undefined>(
  undefined
)

type ProviderProps = {
  children: React.ReactNode
}

const ALL_OPTION_ID = 'all'

export const SharedDataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedStatusId, setSelectedStatusId] = usePersistedState<string>(
    ALL_OPTION_ID,
    'selectedStatusId'
  )

  const [selectedCategoryId, setSelectedCategoryId] = usePersistedState<string>(
    ALL_OPTION_ID,
    'selectedCategoryId'
  )

  const { categories, isLoading: isCategoriesLoading } = useFetchCategories()
  const { statuses, isLoading: isStatusesLoading } = useFetchStatuses()

  return (
    <SharedDataContext.Provider
      value={{
        categories,
        statuses,
        selectedStatusId,
        selectedCategoryId,
        setSelectedStatusId,
        setSelectedCategoryId,
        isCategoriesLoading,
        isStatusesLoading,
        ALL_OPTION_ID,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  )
}

export const useSharedData = () => {
  const context = useContext(SharedDataContext)
  if (!context) {
    throw new Error('useSharedData must be used within a SharedDataProvider')
  }
  return context
}
