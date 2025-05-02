import { TableCell } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export const TableRowSkeleton = ({ cells }: { cells: number }) => {
  return (
    <>
      {Array.from({ length: cells }).map((_, idx) => (
        <TableCell key={idx}>
          <Skeleton className='h-6 w-full rounded animate-pulse' />
        </TableCell>
      ))}
    </>
  )
}
