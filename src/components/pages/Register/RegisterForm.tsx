import CustomCheckbox from '@/components/shared/CustomCheckbox'
import CustomInput from '@/components/shared/CustomInput'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { registerSchema, RegisterSchema } from '@/validation/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  baselineEmail,
  passwordOutline,
  passwordIcon,
  editIcon,
  editIconSolid,
} from '@/assets/images/Register/svg'

const RegisterForm = () => {
  const { register: registerUser } = useAuth()

  const onSubmit = async (formData: RegisterSchema) => {
    const isRegistered = await registerUser({
      email: formData.email,
      password: formData.password,
      name: formData.firstName + ' ' + formData.lastName,
    })

    if (isRegistered) reset()
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })

  return (
    <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        icon={editIconSolid}
        placeholder='first name'
        errorMessage={errors.firstName?.message}
        inputRegisterProps={register('firstName')}
      />

      <CustomInput
        icon={editIcon}
        placeholder='last name'
        errorMessage={errors.lastName?.message}
        inputRegisterProps={register('lastName')}
      />

      <CustomInput
        icon={baselineEmail}
        placeholder='email'
        errorMessage={errors.email?.message}
        inputRegisterProps={register('email')}
      />

      <CustomInput
        icon={passwordIcon}
        placeholder='password'
        type='password'
        errorMessage={errors.password?.message}
        inputRegisterProps={register('password')}
      />

      <CustomInput
        icon={passwordOutline}
        placeholder='confirm password'
        type='password'
        errorMessage={errors.confirmPassword?.message}
        inputRegisterProps={register('confirmPassword')}
      />

      <CustomCheckbox
        label='I agree to all terms'
        registerProps={register('terms')}
      />

      <Button
        type='submit'
        variant='default'
        className='w-fit cursor-pointer active:scale-[98%] disabled:active:scale-100 transition-all'
        disabled={!watch('terms') || isSubmitting}
      >
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
