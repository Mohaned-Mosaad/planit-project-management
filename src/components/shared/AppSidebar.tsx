import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { CategoriesLink, OverviewLink, TasksLink } from '@/constants/routes'
import { LogOut } from 'lucide-react'
import SidebarLinkItem from './_components/AppSidebar/SidebarLinkItem'

const sidebarLinks = {
  body: [OverviewLink, TasksLink, CategoriesLink],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar>

const AppSidebar: React.FC<AppSidebarProps> = ({ className, ...rest }) => {
  const { logout } = useAuth()

  return (
    <Sidebar className={cn(className)} {...rest}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.body.map((link) => {
                return <SidebarLinkItem key={link.url} link={link} />
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut className='size-8 shrink-0' />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
