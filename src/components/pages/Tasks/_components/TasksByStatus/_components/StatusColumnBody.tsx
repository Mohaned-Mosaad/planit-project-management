import SelectionBar from '@/components/shared/SelectionBar'
import ClickOutsideDetector from '@/components/shared/ClickOutsideDetector'
import DropZone from '@/components/shared/DropZone'
import Task from '@/components/shared/Task'
import { useDrag } from '@/contexts/DragContext'
import { useSelect } from '@/contexts/SelectionContext'
import { useEditTask } from '@/hooks/api/tasks'
import { cn } from '@/lib/utils'
import { useCallback, useRef, useState } from 'react'

import { Virtuoso } from 'react-virtuoso'
import { useTaskSearch } from '@/hooks/useTaskSearch'
import { useStatusColumn } from '@/contexts/components/StatusColumnContext'
import DeleteTasks from '@/components/dialogs/DeleteTasksDialog'
import LoadersInitiator from '@/components/shared/LoadersInitiator'
import TasksListSkeleton from '@/components/loaders/TasksListSkeleton'
import { NoDocuments } from '@/components/errors/NoDocuments'

const StatusColumnBody = () => {
  const {
    statusObject: status,
    tasks: originalTasks,
    isTasksLoading,
  } = useStatusColumn()
  const tasks = useTaskSearch(originalTasks?.documents || [])

  const { resetSelection, selectedTasks } = useSelect()
  const { draggedData, setDraggedData } = useDrag()

  const selectionBarRef = useRef<HTMLDivElement>(null)
  const deleteDialogRef = useRef<HTMLDivElement>(null)

  const { editTask } = useEditTask()

  const handleApiCallOnDrop = async () => {
    if (!draggedData) return
    const taskId = draggedData.$id
    const taskStatusId = draggedData.status.$id

    if (taskStatusId === status.$id) return

    await editTask(draggedData, taskId, { status: status.$id })
    setDraggedData(null)
  }

  const itemContent = useCallback(
    (index: number) => {
      const task = tasks[index]
      const isLastItem = index === tasks.length - 1
      return (
        <div className={cn('pb-3 pr-1', isLastItem && 'pb-0')}>
          <Task task={task} omitStatus />
        </div>
      )
    },
    [tasks]
  )

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <DeleteTasks
        ref={deleteDialogRef}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />

      <div style={{ height: 300 }} className='flex flex-col justify-center'>
        <SelectionBar
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          ref={selectionBarRef}
          className='absolute inset-x-3 top-5'
          data-state={selectedTasks.length > 0 ? 'open' : 'closed'}
        />

        <ClickOutsideDetector
          onClickOutside={resetSelection}
          exceptionRefs={[selectionBarRef, deleteDialogRef]}
        >
          <DropZone handleApiCallOnDrop={handleApiCallOnDrop}>
            <LoadersInitiator
              isLoading={isTasksLoading}
              loaderComponent={<TasksListSkeleton />}
            >
              {originalTasks && tasks.length === 0 ? (
                <NoDocuments title='No tasks found' />
              ) : (
                <Virtuoso
                  style={{ height: 300 }}
                  className='main-scrollbar'
                  totalCount={tasks.length}
                  itemContent={itemContent}
                  overscan={10}
                />
              )}
            </LoadersInitiator>
          </DropZone>
        </ClickOutsideDetector>
      </div>
    </>
  )
}

export default StatusColumnBody
