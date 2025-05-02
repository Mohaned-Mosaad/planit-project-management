import { useSharedData } from '@/contexts/SharedDataContext'
import { RadialStatusProgress } from './_components/TasksStatus/RadialStatusProgress'
import { GiProgression } from 'react-icons/gi'
import useFetchTasksNumber from '@/hooks/api/tasks/useFetchTasksNumber'
import { cn } from '@/lib/utils'

const StatusStatistics: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...rest
}) => {
  const { statuses } = useSharedData()
  const { tasksNumber: allTasksCount } = useFetchTasksNumber()

  return (
    <div className={cn('space-y-8', className)} {...rest}>
      <header>
        <div className='flex gap-2'>
          <GiProgression size={20} className='text-secondary-foreground' />
          <h3 className='text-primary capitalize'>status statistics</h3>
        </div>
      </header>
      <div className='max-w-[400px] mx-auto'>
        <div className='grid grid-cols-2 items-center gap-4 justify-items-center'>
          {statuses?.documents.map((status) => (
            <RadialStatusProgress
              key={status.$id}
              statusObject={status}
              allTasksCount={allTasksCount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatusStatistics
