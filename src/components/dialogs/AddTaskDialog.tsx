import { useMemo } from 'react'

import { useAddTask } from '@/hooks/api/tasks'
import { useSharedData } from '@/contexts/SharedDataContext'

import { CategoryDocument, StatusDocument, RawTaskDocument } from '@/types/api'
import { TaskDialog } from './TaskDialog'
import { Dialog } from '../ui/dialog'

type DialogProps = React.ComponentProps<typeof Dialog> & {
  commonCategoryObject?: CategoryDocument
  commonStatusObject?: StatusDocument
  children?: React.ReactNode
}

const AddTaskDialog: React.FC<DialogProps> = ({
  children,
  commonStatusObject,
  commonCategoryObject,
  ...props
}) => {
  const { statuses } = useSharedData()

  const initialTask = useMemo<RawTaskDocument>(
    () => ({
      content: '',
      category: commonCategoryObject ? commonCategoryObject.$id : '',
      status: commonStatusObject
        ? commonStatusObject.$id
        : statuses?.documents[0]?.$id || '',
    }),
    [commonCategoryObject, commonStatusObject, statuses]
  )

  const { addTask, isLoading } = useAddTask()

  async function handleAdd(task: RawTaskDocument) {
    const data = await addTask(task)
    if (data === null) return null
  }

  return (
    <TaskDialog
      initialTask={initialTask}
      handleApiCall={handleAdd}
      isLoading={isLoading}
      headerTitle='Add Task'
      buttonText='Add'
      commonCategoryObject={commonCategoryObject}
      commonStatusObject={commonStatusObject}
      onOpenChange={props.onOpenChange}
      open={props.open}
      {...props}
    >
      {children}
    </TaskDialog>
  )
}

export default AddTaskDialog
