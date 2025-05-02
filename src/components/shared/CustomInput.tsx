import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = React.ComponentProps<typeof Input> & {
  inputRegisterProps: UseFormRegisterReturn
  errorMessage: string | undefined
  icon?: string
}

const CustomInput = ({
  inputRegisterProps,
  errorMessage,
  icon,
  placeholder,
  type = 'text',
}: Props) => {
  return (
    <div>
      <div className='relative'>
        <img
          src={icon}
          alt='icon'
          className='absolute top-1/2 -translate-y-1/2 left-3 size-6'
        />
        <Input
          className={cn('ps-12', errorMessage && 'border-destructive')}
          type={type}
          placeholder={placeholder}
          {...inputRegisterProps}
        />
      </div>
      {errorMessage && (
        <p className='text-destructive text-sm'> {errorMessage}</p>
      )}
    </div>
  )
}

export default CustomInput
