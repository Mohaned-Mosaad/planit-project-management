import { cn } from '@/lib/utils'
import { StatusValue } from '@/types/api'

import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'
const statusVariants = cva('', {
  variants: {
    status: {
      'not started': 'border-destructive',
      deferred: 'border-info',
      'in progress': 'border-warn',
      completed: 'border-success',
    } as Record<StatusValue, string>,
  },
  defaultVariants: {
    status: 'not started',
  },
})

type StatusSeparatorProps = ComponentProps<'hr'> &
  VariantProps<typeof statusVariants>

const StatusSeparator: React.FC<StatusSeparatorProps> = ({
  status,
  ...props
}) => {
  return (
    <hr
      className={cn(statusVariants({ status }), 'border-[1.5px]')}
      {...props}
    />
  )
}

export default StatusSeparator
