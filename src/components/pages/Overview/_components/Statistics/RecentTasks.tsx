import { CalendarCheck2 } from 'lucide-react'

import { Link } from 'react-router'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useFetchRecentTasks from '@/hooks/api/tasks/useFetchRecentTasks'
import { cn } from '@/lib/utils'
import LoaderWrapper from '@/components/shared/LoadersInitiator'
import { TableRowSkeleton } from '@/components/loaders/TableRowSkeleton'
import { Button } from '@/components/ui/button'
import { NoDocumentsTableCell } from '@/components/errors/NoDocumentsTableCell'

const RecentTasks: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...rest
}) => {
  const { tasks, isLoading } = useFetchRecentTasks()

  return (
    <div className={cn('space-y-8', className)} {...rest}>
      <header className='flex justify-between'>
        <div className='flex gap-2'>
          <CalendarCheck2 className='text-secondary-foreground' />
          <h3 className='text-primary capitalize'>recent tasks</h3>
        </div>
        <Button className='px-4 py-2 capitalize'>
          <Link to={'/tasks'}>view all</Link>
        </Button>
      </header>
      <div className='flex gap-3 justify-between'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>content</TableHead>
              <TableHead>category</TableHead>
              <TableHead>status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <LoaderWrapper
              isLoading={isLoading}
              loaderComponent={<TableRowSkeleton cells={4} />}
              loadersCount={5}
              loaderAs={TableRow}
            >
              {tasks?.documents.length === 0 && (
                <NoDocumentsTableCell cols={4} title='No tasks found' />
              )}
              {tasks?.documents.map((task, idx) => (
                <TableRow key={task.$id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className='max-w-[250px]'>
                    <p className='truncate w-11/12'>{task.content}</p>
                  </TableCell>
                  <TableCell>{task.category.category}</TableCell>
                  <TableCell className='text-nowrap'>
                    {task.status.status}
                  </TableCell>
                </TableRow>
              ))}
            </LoaderWrapper>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RecentTasks
