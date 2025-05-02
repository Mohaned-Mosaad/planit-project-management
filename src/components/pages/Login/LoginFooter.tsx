import { Link } from 'react-router'

import { facebookIcon, googleIcon, xIcon } from '@/assets/images/shared/svg'

const LoginFooter = () => {
  return (
    <div className='space-y-2'>
      <div className='flex gap-2 items-center'>
        <span>or login with</span>
        <ul className='flex gap-2'>
          <li>
            <Link
              to='/login'
              className='text-blue-500 hover:underline capitalize'
            >
              <img src={facebookIcon} alt='facebook-icon' className='size-6' />
            </Link>
          </li>
          <li>
            <Link
              to='/login'
              className='text-blue-500 hover:underline capitalize'
            >
              <img src={googleIcon} alt='google-icon' className='size-6' />
            </Link>
          </li>
          <li>
            <Link
              to='/login'
              className='text-blue-500 hover:underline capitalize'
            >
              <img src={xIcon} alt='x-icon' className='size-6' />
            </Link>
          </li>
        </ul>
      </div>

      <p>
        <span>don&apos;t have an account? </span>
        <Link
          to='/register'
          className='text-blue-500 hover:underline capitalize'
        >
          create one
        </Link>
      </p>
    </div>
  )
}

export default LoginFooter
