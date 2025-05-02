import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import React from 'react'

type SelectProps = React.ComponentProps<typeof Select> & {
  labels: string[]
  placeholder?: string
  values: string[]
  className?: string
  id?: string
}

const CustomSelect: React.FC<SelectProps> = ({
  value,
  className,
  id,
  labels,
  values,
  placeholder,
  ...props
}) => {
  return (
    <Select value={value} {...props}>
      <SelectTrigger
        id={id}
        className={cn(
          'min-w-[180px]',
          !value && 'text-muted-foreground',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn('max-h-60', className)}>
        {labels.map((label, idx) => {
          return (
            <SelectItem key={idx} value={values[idx]}>
              {label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default CustomSelect
