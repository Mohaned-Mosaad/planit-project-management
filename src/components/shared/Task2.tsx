import { type TaskDocument } from '@/types/api'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import DeleteDialog from '../dialogs/DeleteDialog'

import { useRemoveTask } from '@/hooks/api/tasks'
import EditTaskDialog from '../dialogs/EditTaskDialog'
import { StatusBadge } from './StatusBadge'
import { useDrag } from '@/contexts/DragContext'
import { useSelect } from '@/contexts/SelectionContext'

type TaskProps = React.ComponentProps<'div'> & {
  task: TaskDocument

  omitStatus?: boolean
  omitCategory?: boolean
}

const Task2: React.FC<TaskProps> = ({
  task,

  className,
  omitStatus = false,
  omitCategory = false,
  ...props
}) => {
  const { setDraggedData } = useDrag()
  const { isSelected } = useSelect()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const taskRef = useRef<HTMLDivElement>(null)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const { isLoading, removeTask } = useRemoveTask()

  const handleEditClick = () => {
    setIsEditDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const handleOnDragStart = (e: React.DragEvent) => {
    if (!taskRef.current) return

    setDraggedData(task)
    setIsDragging(true)

    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!taskRef.current) return

    setIsDragging(true)
    setStartPosition({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      })
    },
    [isDragging, startPosition]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 }) // Reset position after dropping
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleOnDragEnd = () => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
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
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        onMouseDown={handleMouseDown}
        className={cn(
          'relative border rounded-lg bg-white space-y-2 p-4 shadow-sm cursor-grab active:cursor-grabbing',
          isDragging && 'opacity-75 shadow-lg scale-105 z-50',
          isSelected(task.$id) && 'border border-primary',

          className
        )}
        style={{
          position: isDragging ? 'fixed' : 'relative', // ✅ Allows free movement
          transform: isDragging
            ? `translate(${position.x}px, ${position.y}px)`
            : 'none',
          transition: isDragging ? 'none' : 'transform 0.2s ease-out', // ✅ Smooth return
        }}
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

export default Task2
