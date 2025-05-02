import RadialProgress from '@/components/shared/RadialProgress'
import { cn } from '@/lib/utils'

import { StatusDocument, StatusValue } from '@/types/api'
import useFetchTasksNumber from '@/hooks/api/tasks/useFetchTasksNumber'
import { useMemo } from 'react'
import { cva } from 'class-variance-authority'
import { StatusDot } from '@/components/shared/StatusDot'

type Props = {
  statusObject: StatusDocument
  allTasksCount: number | null
}

const statusVariants = cva('', {
  variants: {
    status: {
      'not started': 'text-destructive',
      deferred: 'text-info',
      'in progress': 'text-warn',
      completed: 'text-success',
    } as Record<StatusValue, string>,
  },
  defaultVariants: {
    status: 'not started',
  },
})

export const RadialStatusProgress: React.FC<Props> = ({
  statusObject,
  allTasksCount,
}) => {
  const queryParams = useMemo(
    () => ({
      status: statusObject.$id,
    }),
    [statusObject.$id]
  )

  const { tasksNumber } = useFetchTasksNumber(queryParams)

  const progress =
    tasksNumber && allTasksCount
      ? Math.round((tasksNumber / allTasksCount) * 100 || 0)
      : 0

  return (
    <div className='space-y-3'>
      <RadialProgress
        size={130}
        progress={progress}
        className={cn(
          statusVariants({ status: statusObject.status }),
          'rounded-full'
        )}
      />
      <div className='flex gap-2 items-end text-xl capitalize'>
        <StatusDot status={statusObject.status} className='size-5' />
        {statusObject.status}
      </div>
    </div>
  )
}
