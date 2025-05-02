import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.ComponentProps<'div'> & {
  children: React.ReactNode
  className?: string
}

const LayoutContainer: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={cn('px-5 space-y-16', className)} {...rest}>
      {children}
    </div>
  )
}

export default LayoutContainer
