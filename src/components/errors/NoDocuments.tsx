import { FileX } from 'lucide-react'

export const NoDocuments = ({ title }: { title?: string }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full min-h-[300px]'>
      <FileX className='size-28 text-my-gray' />
      <p className='text-xl text-my-gray capitalize'>
        {title || 'No documents found'}
      </p>
    </div>
  )
}
