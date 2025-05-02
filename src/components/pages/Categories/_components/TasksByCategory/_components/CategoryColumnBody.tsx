import ClickOutsideDetector from '@/components/shared/ClickOutsideDetector'
import DropZone from '@/components/shared/DropZone'
import SelectionBar from '@/components/shared/SelectionBar'
import Task from '@/components/shared/Task'
import { Virtuoso } from 'react-virtuoso'
import { useCallback, useRef, useState } from 'react'

import { useCategoryColumn } from '@/contexts/components/CategoryColumnContext'
import { useDrag } from '@/contexts/DragContext'
import { useSelect } from '@/contexts/SelectionContext'
import { useEditTask } from '@/hooks/api/tasks'
import { useTaskSearch } from '@/hooks/useTaskSearch'

import { cn } from '@/lib/utils'

import DeleteTasksDialog from '@/components/dialogs/DeleteTasksDialog'
import LoadersInitiator from '@/components/shared/LoadersInitiator'

import TasksListSkeleton from '@/components/loaders/TasksListSkeleton'
import { NoDocuments } from '@/components/errors/NoDocuments'

export const CategoryColumnBody = () => {
  const {
    categoryObject,
    tasks: originalTasks,
    isLoading,
  } = useCategoryColumn()

  const { resetSelection, selectedTasks } = useSelect()
  const { draggedData, setDraggedData } = useDrag()

  const tasks = useTaskSearch(originalTasks?.documents || [])

  const selectionBarRef = useRef<HTMLDivElement>(null)
  const deleteDialogRef = useRef<HTMLDivElement>(null)

  const { editTask } = useEditTask()

  const handleApiCallOnDrop = async (e: React.DragEvent) => {
    if (!draggedData) return
    if (draggedData.category.$id === categoryObject.$id) return

    e.preventDefault()

    await editTask(draggedData, draggedData.$id, {
      category: categoryObject.$id,
    })
    setDraggedData(null)
  }

  const itemContent = useCallback(
    (idx: number) => {
      const task = tasks[idx]
      if (!task) return null

      return (
        <div className={cn('pb-3 pr-1', idx === tasks.length - 1 && 'pb-0')}>
          <Task task={task} omitCategory />
        </div>
      )
    },
    [tasks]
  )

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <DeleteTasksDialog
        ref={deleteDialogRef}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />

      <div style={{ height: 300 }} className='flex flex-col justify-center'>
        <SelectionBar
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          ref={selectionBarRef}
          className='absolute inset-x-3 top-4'
          data-state={selectedTasks.length > 0 ? 'open' : 'closed'}
        />

        <ClickOutsideDetector
          onClickOutside={resetSelection}
          exceptionRefs={[selectionBarRef, deleteDialogRef]}
        >
          <DropZone handleApiCallOnDrop={handleApiCallOnDrop}>
            <LoadersInitiator
              isLoading={isLoading}
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
