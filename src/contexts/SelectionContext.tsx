import { CategoryDocument, StatusDocument, TaskDocument } from '@/types/api'
import { useContext, useState, createContext, useMemo } from 'react'

type SelectionContextType = {
  selectedTasks: string[]
  toggleSelection: (taskId: string) => void
  selectAll: (tasks: TaskDocument[]) => void
  isSelected: (taskId: string) => boolean
  resetSelection: () => void
  columnObject: StatusDocument | CategoryDocument
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
)

type SelectionProviderProps = {
  columnObject: StatusDocument | CategoryDocument
  children: React.ReactNode
}
export const SelectionProvider: React.FC<SelectionProviderProps> = ({
  children,
  columnObject,
}) => {
  const initialSelectedTasks: Record<string, boolean> = useMemo(() => ({}), [])

  const [selectedTasks, setSelectedTasks] = useState(initialSelectedTasks)

  const taskIds = Object.keys(selectedTasks)

  const toggleSelection = (taskId: string) => {
    if (!selectedTasks[taskId]) {
      setSelectedTasks((prev) => ({ ...prev, [taskId]: true }))
    } else {
      setSelectedTasks((prev) => {
        let updated = { ...prev }
        delete updated[taskId]
        if (Object.keys(updated).length === 0) {
          updated = initialSelectedTasks
        }

        return updated
      })
    }
  }

  const selectAll = (tasks: TaskDocument[]) => {
    const selectedTasks: Record<string, boolean> = {}
    tasks.forEach((task) => {
      selectedTasks[task.$id] = true
    })
    setSelectedTasks(selectedTasks)
  }

  const isSelected = (taskId: string) => {
    return selectedTasks[taskId]
  }

  const resetSelection = () => {
    setSelectedTasks(initialSelectedTasks)
  }

  return (
    <SelectionContext.Provider
      value={{
        selectedTasks: taskIds,
        selectAll,
        isSelected,
        toggleSelection,
        resetSelection,
        columnObject,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelect = () => {
  const context = useContext(SelectionContext)

  if (!context) {
    throw new Error('useSelect must be used within a SelectionProvider')
  }
  return context
}
