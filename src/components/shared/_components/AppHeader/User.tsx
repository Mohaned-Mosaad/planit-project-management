import { useAuth } from '@/contexts/AuthContext'
import { FaUser } from 'react-icons/fa'

const User = () => {
  const { user } = useAuth()

  return (
    <div className='flex gap-3'>
      <div className='text-right'>
        <p>{user?.name}</p>
        <p className='text-my-gray'>{user?.email}</p>
      </div>
      <div className='h-full'>
        <FaUser size={40} />
      </div>
    </div>
  )
}

export default User
