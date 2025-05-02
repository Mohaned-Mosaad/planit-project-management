import { FileX } from 'lucide-react'
import { TableCell, TableRow } from '../ui/table'

export const NoDocumentsTableCell = ({
  title,
  cols,
}: {
  title?: string
  cols?: number
}) => {
  return (
    <TableRow className='w-full h-full'>
      <TableCell colSpan={cols} className='text-center'>
        <div className='flex flex-col items-center justify-center'>
          <FileX className='size-28 text-my-gray' />
          <p className='text-xl text-my-gray capitalize'>
            {title || 'No documents found'}
          </p>
        </div>
      </TableCell>
    </TableRow>
  )
}
