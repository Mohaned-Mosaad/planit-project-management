import StatusTasksSectionHeader from './_components/TasksByStatus/StatusTasksSectionHeader'
import StatusTasksSectionBody from './_components/TasksByStatus/StatusTasksSectionBody'

const StatusTasksSection = () => {
  return (
    <section className='space-y-8'>
      <StatusTasksSectionHeader />

      <StatusTasksSectionBody />
    </section>
  )
}

export default StatusTasksSection
