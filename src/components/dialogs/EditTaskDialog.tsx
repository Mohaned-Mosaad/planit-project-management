import { Dialog } from '@/components/ui/dialog'

import { useEditTask } from '@/hooks/api/tasks'
import { RawTaskDocument, TaskDocument } from '@/types/api'
import React from 'react'

import { TaskDialog } from './TaskDialog'

type DialogProps = React.ComponentProps<typeof Dialog> & {
  task: TaskDocument
}

const EditTaskDialog: React.FC<DialogProps> = ({
  task,
  children,
  open,
  onOpenChange,
  ...rest
}) => {
  const { editTask, isLoading } = useEditTask()

  async function handleUpdate(editedTask: RawTaskDocument) {
    const data = await editTask(task, task.$id, editedTask)
    if (data === null) return null
  }

  return (
    <TaskDialog
      initialTask={{
        content: task.content,
        category: task.category.$id,
        status: task.status.$id,
      }}
      handleApiCall={handleUpdate}
      isLoading={isLoading}
      headerTitle='Edit Task'
      buttonText='Save changes'
      open={open}
      onOpenChange={onOpenChange}
      {...rest}
    >
      {children}
    </TaskDialog>
  )
}

export default EditTaskDialog
