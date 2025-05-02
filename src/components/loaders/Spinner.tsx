import { cn } from '@/lib/utils'

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div
        className={cn(
          'size-32 border-8 rounded-full animate-spin border-primary !border-t-transparent',
          className
        )}
      />
    </div>
  )
}

export default Spinner
