import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useSearch } from '@/contexts/SearchContext'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

const SearchBar: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...rest
}) => {
  const { searchInput, setSearchInput } = useSearch()

  return (
    <div className={cn(' relative', className)} {...rest}>
      <Input
        className='flex-1 border-none bg-white pe-12'
        placeholder='Search your task here...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Badge
        className='absolute right-0 top-1/2 -translate-y-1/2 h-full'
        variant='secondary'
      >
        <Search className='size-5 text-secondary-foreground' />
      </Badge>
    </div>
  )
}

export default SearchBar
