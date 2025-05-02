import { Label } from '@/components/ui/label'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = React.ComponentProps<typeof Input> & {
  registerProps?: UseFormRegisterReturn

  label: string
  labelClassName?: string
}

const CustomCheckbox = ({
  label,
  registerProps,

  labelClassName,
}: Props) => {
  const inputRegisterProps = registerProps || {}
  return (
    <div className='flex gap-4 items-center relative'>
      <Input
        type='checkbox'
        id={'terms'}
        className='size-[16px]'
        {...inputRegisterProps}
      />
      <Label htmlFor='terms' className={cn('font-light', labelClassName)}>
        {label}
      </Label>
    </div>
  )
}

export default CustomCheckbox
