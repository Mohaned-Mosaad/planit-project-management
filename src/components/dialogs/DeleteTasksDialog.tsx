import React, { forwardRef, useEffect } from 'react'
import { useSelect } from '@/contexts/SelectionContext'
import { useRemoveTasks } from '@/hooks/api/tasks'
import DeleteDialog from './DeleteDialog'
import { Dialog } from '@radix-ui/react-dialog'

type Props = React.ComponentPropsWithoutRef<typeof Dialog>

const DeleteTasksDialog = forwardRef<HTMLDivElement, Props>(
  ({ open, onOpenChange, ...rest }, ref) => {
    const { selectedTasks, resetSelection, columnObject } = useSelect()

    const { removeTasks, isLoading } = useRemoveTasks()

    const handleDeleteTasks = async () => {
      const data = await removeTasks(columnObject, selectedTasks)
      if (data === null) return
      resetSelection()
    }

    useEffect(() => {
      if (selectedTasks.length === 0) {
        if (onOpenChange) {
          onOpenChange(false)
        }
      }
    }, [selectedTasks, onOpenChange])

    return (
      <DeleteDialog
        open={open}
        onOpenChange={onOpenChange}
        ref={ref}
        handleDelete={handleDeleteTasks}
        isLoading={isLoading}
        alertDescription='This action cannot be undone. This will permanently delete your selected tasks from our server.'
        {...rest}
      />
    )
  }
)

DeleteTasksDialog.displayName = 'DeleteTasksDialog'

export default DeleteTasksDialog
