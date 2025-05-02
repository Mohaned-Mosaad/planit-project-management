import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { user as userIcon, passwordIcon } from '@/assets/images/Register/svg'
import CustomInput from '@/components/shared/CustomInput'

import { loginSchema, LoginSchema } from '@/validation/LoginSchema'
import CustomCheckbox from '@/components/shared/CustomCheckbox'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

const LoginForm = () => {
  const { login } = useAuth()

  const onSubmit = async (formData: LoginSchema) => {
    await login(formData.email, formData.password)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

  return (
    <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        icon={userIcon}
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

      <CustomCheckbox label='remember me' labelClassName='capitalize' />

      <Button
        type='submit'
        variant='default'
        className='w-fit cursor-pointer active:scale-[98%] disabled:active:scale-100 transition-all'
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm
