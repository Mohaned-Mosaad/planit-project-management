import TaskSkeleton from './TaskSkeleton'

const TasksListSkeleton = () => {
  return (
    <div className='space-y-3 overflow-y-hidden' style={{ height: 300 }}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <TaskSkeleton key={idx} />
      ))}
    </div>
  )
}

export default TasksListSkeleton
