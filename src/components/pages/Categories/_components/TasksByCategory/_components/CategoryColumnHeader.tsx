import { useSelect } from '@/contexts/SelectionContext'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import AddTaskDialog from '@/components/dialogs/AddTaskDialog'

import EditCategoryDialog from '@/components/dialogs/EditCategoryDialog'

import {
  CalendarPlus,
  EllipsisVertical,
  SquareMousePointer,
} from 'lucide-react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { useCategoryColumn } from '@/contexts/components/CategoryColumnContext'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import { useRemoveCategory } from '@/hooks/api/categories'

export const CategoryColumnHeader = () => {
  const { categoryObject: category, tasks } = useCategoryColumn()

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const { selectAll } = useSelect()

  const handleEditClick = () => {
    setIsEditDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const handleAddTaskClick = () => {
    setIsTaskDialogOpen(true)
    setIsDropDownOpen(false)
  }

  const { removeCategory, isLoading } = useRemoveCategory()

  const { categoryObject } = useCategoryColumn()

  async function handleDeleteCategory() {
    await removeCategory(categoryObject.$id)
  }

  return (
    <>
      <EditCategoryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isLoading={isLoading}
        handleDelete={handleDeleteCategory}
      />

      <AddTaskDialog
        commonCategoryObject={category}
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
      />

      <header className='font-bold capitalize space-x-2 p-3 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <span>{category.category}</span>
          <Badge variant='secondary' className='bg-gray-200'>
            {tasks?.documents.length || 0}
          </Badge>
        </div>
        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger className='size-4'>
            <EllipsisVertical className='size-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleAddTaskClick}>
              <CalendarPlus />
              Add Task
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleEditClick}>
              <FaEdit />
              Edit Category
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDeleteClick}>
              <FaTrashAlt />
              Delete Category
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => selectAll(tasks?.documents || [])}
            >
              <SquareMousePointer />
              Select All Tasks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  )
}
