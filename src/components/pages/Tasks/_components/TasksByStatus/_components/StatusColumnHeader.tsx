import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import AddTaskDialog from '@/components/dialogs/AddTaskDialog'
import {
  CalendarPlus,
  EllipsisVertical,
  SquareMousePointer,
} from 'lucide-react'
import { useStatusColumn } from '@/contexts/components/StatusColumnContext'
import { useState } from 'react'
import { useSelect } from '@/contexts/SelectionContext'

import { useSharedData } from '@/contexts/SharedDataContext'
import StatusSeparator from './StatusSeparator'
import { StatusDot } from '@/components/shared/StatusDot'
const StatusColumnHeader = () => {
  const { statusObject: status, tasks } = useStatusColumn()
  const { selectedCategoryId } = useSharedData()
  const { selectAll } = useSelect()

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  const handleAddTaskClick = () => {
    setIsTaskDialogOpen(true)
    setIsDropDownOpen(false)
  }

  return (
    <>
      <AddTaskDialog
        key={selectedCategoryId}
        commonStatusObject={status}
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
      />

      <header className='font-bold capitalize p-3 space-y-4 text-not'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <StatusDot status={status.status} className='size-5' />
            <h2>{status.status}</h2>
            <Badge variant='secondary'>{tasks?.documents.length || 0}</Badge>
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

              <DropdownMenuItem
                onSelect={() => selectAll(tasks?.documents || [])}
              >
                <SquareMousePointer />
                Select All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <StatusSeparator status={status.status} />
      </header>
    </>
  )
}

export default StatusColumnHeader
