import { loginImage } from '@/assets/images/Login/png'

import LoginForm from '@/components/pages/Login/LoginForm'
import LoginFooter from '@/components/pages/Login/LoginFooter'

const Login = () => {
  return (
    <div className='relative bg-white rounded-lg max-w-[1000px] mx-auto flex flex-col md:flex-row'>
      <section className='basis-1/2 p-10 md:pe-0 space-y-4'>
        <h2 className='font-medium text-3xl capitalize'>sign in</h2>

        <LoginForm />

        <LoginFooter />
      </section>

      <section className='basis-1/2 grow-0 pt-10 flex justify-center md:justify-start'>
        <img
          src={loginImage}
          alt='register-img'
          className='self-end max-h-[450px]'
        />
      </section>
    </div>
  )
}

export default Login
