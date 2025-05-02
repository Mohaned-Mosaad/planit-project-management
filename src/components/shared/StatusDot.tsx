import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { GoDotFill } from 'react-icons/go'
import { IconType } from 'react-icons/lib'

const statusDotVariants = cva('rounded-full', {
  variants: {
    status: {
      'not started': 'text-destructive',
      deferred: 'text-info',
      'in progress': 'text-warn',
      completed: 'text-success',
    },
  },
  defaultVariants: {
    status: 'not started',
  },
})

type Props = VariantProps<typeof statusDotVariants> & ComponentProps<IconType>

export const StatusDot: React.FC<Props> = ({ status, className }) => {
  return <GoDotFill className={cn(statusDotVariants({ status }), className)} />
}
