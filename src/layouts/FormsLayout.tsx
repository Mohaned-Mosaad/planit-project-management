import { formsBackground } from '@/assets/images/shared/png'

import { Outlet } from 'react-router'

const FormsLayout = () => {
  return (
    <div className='bg-primary/80 relative min-h-screen p-[2rem] md:p-[5rem]'>
      <div
        style={{ backgroundImage: `url(${formsBackground})` }}
        className='absolute top-0 left-0 size-full bg-cover bg-no-repeat'
      />

      <Outlet />
    </div>
  )
}

export default FormsLayout
