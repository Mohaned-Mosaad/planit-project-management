import { CalendarCheck } from 'lucide-react'
import { ComponentType, SVGProps } from 'react'
import { MdCategory } from 'react-icons/md'
import { RiLayoutMasonryFill } from 'react-icons/ri'

export type LinkObject = {
  title: string
  url: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const OverviewLink = {
  title: 'Home',
  url: '/',
  icon: RiLayoutMasonryFill,
}

export const CategoriesLink = {
  title: 'Categories',
  url: '/categories',
  icon: MdCategory,
}

export const TasksLink = { title: 'Tasks', url: '/tasks', icon: CalendarCheck }

export const RegisterLink = {
  title: 'Register',
  url: '/register',
}

export const LoginLink = { title: 'Login', url: '/login' }
