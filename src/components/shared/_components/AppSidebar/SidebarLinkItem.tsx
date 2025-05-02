import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { LinkObject } from '@/constants/routes'
import { NavLink, useMatch } from 'react-router'

const SidebarLinkItem = ({ link }: { link: LinkObject }) => {
  const match = useMatch({ path: link.url })
  return (
    <SidebarMenuItem key={link.url}>
      <SidebarMenuButton asChild isActive={!!match} className='shrink-0'>
        <NavLink to={link.url}>
          <link.icon className='shrink-0' />
          <span>{link.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default SidebarLinkItem
