import { CategoryDocument, TaskDocument } from '@/types/api'
import { createContext, useContext } from 'react'
import useFetchCategoryTasks from '@/hooks/api/tasks/useFetchCategoryTasks'

type ContextType = {
  categoryObject: CategoryDocument
  isLoading: boolean
  tasks: {
    total: number
    documents: TaskDocument[]
  } | null
}
const CategoryColumnContext = createContext<ContextType | undefined>(undefined)

type ProviderProps = {
  categoryObject: CategoryDocument
  children: React.ReactNode
}
export const CategoryColumnProvider = ({
  categoryObject,
  children,
}: ProviderProps) => {
  const { tasks, isLoading } = useFetchCategoryTasks(categoryObject)

  return (
    <CategoryColumnContext.Provider
      value={{ categoryObject, tasks, isLoading }}
    >
      {children}
    </CategoryColumnContext.Provider>
  )
}

export const useCategoryColumn = () => {
  const context = useContext(CategoryColumnContext)
  if (context === undefined) {
    throw new Error(
      'useCategoryColumn must be used within a CategoryColumnProvider'
    )
  }
  return context
}
