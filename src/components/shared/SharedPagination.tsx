import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const SharedPagination = ({
  pages,
  onPageChange,
}: {
  pages: number
  onPageChange: (page: number) => void
}) => {
  const [page, setPage] = useState(1)

  const goBack = () => {
    setPage((prev) => (prev === 1 ? prev : prev - 1))
  }

  const goNext = () => {
    setPage((prev) => (prev === pages ? prev : prev + 1))
  }

  useEffect(() => {
    onPageChange(page)
  }, [page, onPageChange])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={cn(
            'cursor-pointer',
            page === 1 && 'pointer-events-none opacity-50'
          )}
        >
          <PaginationPrevious onClick={goBack} />
        </PaginationItem>

        {Array.from({ length: pages }).map((_, idx) => (
          <PaginationItem
            key={idx}
            className={cn(
              'cursor-pointer rounded',
              page === idx + 1 ? 'bg-muted' : 'bg-transparent'
            )}
          >
            <PaginationLink
              onClick={() => {
                setPage(idx + 1)
              }}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          className={cn(
            'cursor-pointer',
            page === pages && 'pointer-events-none opacity-50'
          )}
        >
          <PaginationNext onClick={goNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default SharedPagination
