import Cookies from 'js-cookie'

import {
  SIDEBAR_COOKIE_NAME,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import AppSidebar from '@/components/shared/AppSidebar'
import AppHeader from '@/components/shared/AppHeader'
import { Outlet } from 'react-router'
import LayoutContainer from './LayoutContainer'
import { SearchProvider } from '@/contexts/SearchContext'

const sidebarState = Cookies.get(SIDEBAR_COOKIE_NAME)
const DashboardLayout = () => {
  return (
    <SearchProvider>
      <SidebarProvider
        defaultOpen={sidebarState ? sidebarState === 'true' : true}
      >
        <AppSidebar collapsible='icon' />
        <SidebarInset>
          <LayoutContainer>
            <AppHeader />
          </LayoutContainer>
          <main className='py-4'>{<Outlet />}</main>
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  )
}

export default DashboardLayout
