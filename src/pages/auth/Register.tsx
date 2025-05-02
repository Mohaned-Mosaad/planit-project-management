import { registerImage } from '@/assets/images/Register/png'

import { Link } from 'react-router'

import RegisterForm from '@/components/pages/Register/RegisterForm'

const Register = () => {
  return (
    <div className='relative bg-white rounded-lg max-w-[1000px] mx-auto flex flex-col md:flex-row'>
      <section className='basis-1/2 grow-0 pt-10 flex justify-center md:justify-start'>
        <img
          src={registerImage}
          alt='register-img'
          className='self-end max-h-[450px]'
        />
      </section>

      <section className='basis-1/2 p-10 md:ps-0 space-y-4'>
        <h2 className='font-medium text-3xl capitalize'>sign up</h2>

        <RegisterForm />

        <p>
          <span>Already have an account? </span>
          <Link
            to='/login'
            className='text-blue-500 hover:underline capitalize'
          >
            Sign in
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Register
