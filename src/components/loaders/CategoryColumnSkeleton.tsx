import Spinner from './Spinner'

const CategoryColumnSkeleton: React.FC = () => {
  return (
    <div className='p-3 bg-gray-50 rounded-xl h-[400px]'>
      <Spinner className='border-gray-100' />
    </div>
  )
}

export default CategoryColumnSkeleton
