import { cn } from '@/lib/utils'

import SearchBar from '@/components/shared/_components/AppHeader/SearchBar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import User from './_components/AppHeader/User'
import { useSearch } from '@/contexts/SearchContext'
import { useLocation } from 'react-router'

type AppHeaderProps = React.ComponentProps<'header'>

const AppHeader: React.FC<AppHeaderProps> = ({ className, ...rest }) => {
  const location = useLocation()
  const { isAllowed } = useSearch()

  return (
    <header
      className={cn(
        'flex flex-wrap gap-4 items-center justify-between py-5',
        className
      )}
      {...rest}
    >
      <div className='flex gap-4'>
        <SidebarTrigger />
        <h2 className='text-2xl font-bold'>
          <span className='text-primary'>Plan</span>
          <span>It</span>
        </h2>
      </div>
      {isAllowed(location.pathname) && (
        <SearchBar className='w-full order-3 sm:w-1/3 min-w-[230px] sm:-order-none' />
      )}
      <User />
    </header>
  )
}

export default AppHeader
