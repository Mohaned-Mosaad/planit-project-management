import error from '@/assets/images/ErrorPage/error.jpg'

const ErrorPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <img src={error} alt='page not found' className='h-full object-cover' />
    </div>
  )
}

export default ErrorPage
