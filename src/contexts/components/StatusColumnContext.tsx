import { useFetchStatusTasks } from '@/hooks/api/tasks'
import { StatusDocument, TaskDocument } from '@/types/api'
import { createContext, useContext } from 'react'

type ContextType = {
  statusObject: StatusDocument
  tasks: {
    total: number
    documents: TaskDocument[]
  } | null
  isTasksLoading: boolean
}
const StatusColumnContext = createContext<ContextType | undefined>(undefined)

type ProviderProps = {
  statusObject: StatusDocument
  children: React.ReactNode
}

export const StatusColumnProvider = ({
  statusObject,
  children,
}: ProviderProps) => {
  const { tasks, isLoading: isTasksLoading } = useFetchStatusTasks(statusObject)

  return (
    <StatusColumnContext.Provider
      value={{ statusObject, tasks, isTasksLoading }}
    >
      {children}
    </StatusColumnContext.Provider>
  )
}

export const useStatusColumn = () => {
  const context = useContext(StatusColumnContext)
  if (context === undefined) {
    throw new Error(
      'useStatusColumn must be used within a StatusColumnProvider'
    )
  }
  return context
}
