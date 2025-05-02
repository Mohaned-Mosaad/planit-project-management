import { TaskDocument } from '@/types/api'
import React, { createContext, useContext, useState } from 'react'

type DragContextType = {
  draggedData: TaskDocument | null
  setDraggedData: (data: TaskDocument | null) => void
}

const DragContext = createContext<DragContextType | undefined>(undefined)

export const DragProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [draggedData, setDraggedData] = useState<TaskDocument | null>(null)

  return (
    <DragContext.Provider value={{ draggedData, setDraggedData }}>
      {children}
    </DragContext.Provider>
  )
}

export const useDrag = () => {
  const context = useContext(DragContext)
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider')
  }
  return context
}
