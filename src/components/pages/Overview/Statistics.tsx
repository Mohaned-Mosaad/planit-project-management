import {
  RecentCategories,
  RecentTasks,
  StatusStatistics,
} from '@/components/pages/Overview/_components/Statistics'

const Statistics = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 [&>*]:p-8 [&>*]:border [&>*]:rounded-lg'>
      <RecentTasks className='min-h-[380px] h-full' />
      <RecentCategories className='min-h-[380px] h-full' />
      <StatusStatistics />
    </div>
  )
}

export default Statistics
