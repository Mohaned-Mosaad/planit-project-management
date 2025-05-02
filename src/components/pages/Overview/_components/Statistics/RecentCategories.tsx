import { MdCategory } from 'react-icons/md'
import { Link } from 'react-router'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFetchRecentCategories } from '@/hooks/api/categories'
import { cn } from '@/lib/utils'
import LoaderWrapper from '@/components/shared/LoadersInitiator'
import { TableRowSkeleton } from '@/components/loaders/TableRowSkeleton'
import { Button } from '@/components/ui/button'
import { NoDocumentsTableCell } from '@/components/errors/NoDocumentsTableCell'

const RecentCategories: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...rest
}) => {
  const { categories, isLoading } = useFetchRecentCategories()

  return (
    <div className={cn('space-y-8', className)} {...rest}>
      <header className='flex justify-between'>
        <div className='flex gap-2'>
          <MdCategory size={20} className='text-secondary-foreground' />
          <h3 className='text-primary capitalize'>recent categories</h3>
        </div>

        <Button className='px-4 py-2 capitalize'>
          <Link to='/categories'>view all</Link>
        </Button>
      </header>

      <div className='flex gap-3 justify-between'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <LoaderWrapper
              isLoading={isLoading}
              loaderComponent={<TableRowSkeleton cells={2} />}
              loadersCount={5}
              loaderAs={TableRow}
            >
              {categories?.documents.length === 0 && (
                <NoDocumentsTableCell cols={2} title='No categories found' />
              )}

              {categories?.documents.map((category, idx) => (
                <TableRow key={category.$id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{category.category}</TableCell>
                </TableRow>
              ))}
            </LoaderWrapper>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RecentCategories
