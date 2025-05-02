import LoadersInitiator from '@/components/shared/LoadersInitiator'
import StatusColumn from './StatusColumn'
import { useSharedData } from '@/contexts/SharedDataContext'
import DataColumnSkeleton from '@/components/loaders/CategoryColumnSkeleton'
import { NoDocuments } from '@/components/errors/NoDocuments'

const StatusTasksSectionBody = () => {
  const { statuses, isStatusesLoading } = useSharedData()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5'>
      <LoadersInitiator
        isLoading={isStatusesLoading}
        loaderComponent={<DataColumnSkeleton />}
        loadersCount={4}
      >
        {statuses?.documents.length === 0 && (
          <div className='col-span-full h-[300px] flex items-center justify-center'>
            <NoDocuments title='No statuses found' />
          </div>
        )}

        {statuses?.documents.map((obj) => {
          return <StatusColumn key={obj.$id} statusObject={obj} />
        })}
      </LoadersInitiator>
    </div>
  )
}

export default StatusTasksSectionBody
