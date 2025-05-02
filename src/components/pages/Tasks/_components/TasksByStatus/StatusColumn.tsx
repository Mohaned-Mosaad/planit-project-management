import StatusColumnBody from './_components/StatusColumnBody'
import StatusColumnHeader from './_components/StatusColumnHeader'
import { SelectionProvider } from '@/contexts'
import { StatusDocument } from '@/types/api'
import { StatusColumnProvider } from '@/contexts/components/StatusColumnContext'

type Props = {
  statusObject: StatusDocument
} & React.ComponentPropsWithRef<'div'>

const StatusColumn: React.FC<Props> = ({ statusObject }) => {
  return (
    <StatusColumnProvider statusObject={statusObject}>
      <SelectionProvider columnObject={statusObject}>
        <div className='relative space-y-4 p-3 bg-gray-100 rounded-xl'>
          <StatusColumnHeader />

          <StatusColumnBody />
        </div>
      </SelectionProvider>
    </StatusColumnProvider>
  )
}

export default StatusColumn
