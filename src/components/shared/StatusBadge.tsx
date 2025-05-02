import { Badge, badgeVariants } from '@/components/ui/badge'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { StatusValue } from '@/types/api'

// Extend badgeVariants with new status variants
const statusVariants = cva(badgeVariants(), {
  variants: {
    status: {
      'not started':
        'bg-destructive/15 text-destructive hover:bg-destructive/10',
      deferred: 'bg-info/15 text-info hover:bg-info/10',
      'in progress': 'bg-warn/15 text-warn hover:bg-warn/10',
      completed: 'bg-success/15 text-success hover:bg-success/10',
    } as Record<StatusValue, string>,
  },
  defaultVariants: {
    status: 'not started',
  },
})

type StatusBadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof statusVariants>

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  return (
    <Badge className={cn(statusVariants({ status }), className)} {...props} />
  )
}
