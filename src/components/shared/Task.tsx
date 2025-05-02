import { type TaskDocument } from '@/types/api'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

import { memo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import DeleteDialog from '../dialogs/DeleteDialog'

import { useRemoveTask } from '@/hooks/api/tasks'
import { useSelect } from '@/contexts/SelectionContext'
import EditTaskDialog from '../dialogs/EditTaskDialog'
import { StatusBadge } from './StatusBadge'
import { useDrag } from '@/contexts/DragContext'

type TaskProps = React.ComponentProps<'div'> & {
  task: TaskDocument
  omitStatus?: boolean
  omitCategory?: boolean
}

const Task: React.FC<TaskProps> = ({
  task,
  className,
  omitStatus = false,
  omitCategory = false,
  ...props
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { isSelected, toggleSelection } = useSelect()

  const taskRef = useRef<HTMLDivElement>(null)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const { removeTask, isLoading } = useRemoveTask()

  const handleEditClick = () => {
    setIsEditDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const { setDraggedData } = useDrag()

  const handleOnDragStart = () => {
    setDraggedData(task)

    setTimeout(() => {
      taskRef.current?.classList.add('opacity-50')
      taskRef.current?.classList.add('pointer-events-none')
    }, 0)
  }

  const handleOnDragEnd = () => {
    taskRef.current?.classList.remove('opacity-50')
    taskRef.current?.classList.remove('pointer-events-none')
  }

  async function handleDelete() {
    await removeTask(task, task.$id)
  }

  return (
    <>
      <EditTaskDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        task={task}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        alertDescription='This action cannot be undone. This will permanently delete your task from our server.'
        handleDelete={handleDelete}
        isLoading={isLoading}
      />

      <div
        ref={taskRef}
        onClick={() => toggleSelection(task.$id)}
        className={cn(
          'relative border rounded-lg bg-white space-y-2 p-4 shadow-sm active:cursor-grabbing',
          isSelected(task.$id) && 'border border-primary',
          className
        )}
        draggable
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        {...props}
      >
        <div className='flex gap-2 relative'>
          {omitStatus ? null : (
            <StatusBadge status={task.status.status}>
              {task.status.status}
            </StatusBadge>
          )}
          {omitCategory ? null : (
            <Badge variant='secondary'>{task.category.category}</Badge>
          )}
        </div>

        <p className='relative'>{task.content}</p>

        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger className='absolute top-3 right-3 size-4'>
            <EllipsisVertical className='size-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleEditClick}>
              <FaEdit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDeleteClick}>
              <FaTrashAlt />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default memo(Task)
