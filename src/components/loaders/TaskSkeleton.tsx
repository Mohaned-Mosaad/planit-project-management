import { Skeleton } from '@/components/ui/skeleton'
import { useMemo } from 'react'

const TaskSkeleton = () => {
  const randomNum = useMemo(() => Math.floor(Math.random() * 3), [])
  return (
    <div className='p-4 rounded-lg border bg-white space-y-3'>
      <Skeleton className='h-5 w-1/4 rounded animate-pulse' />

      {Array.from({ length: randomNum }).map((_, idx) => (
        <Skeleton key={idx} className='h-3 w-full rounded animate-pulse' />
      ))}
      <Skeleton className='h-3 w-5/6 rounded animate-pulse' />
    </div>
  )
}

export default TaskSkeleton
