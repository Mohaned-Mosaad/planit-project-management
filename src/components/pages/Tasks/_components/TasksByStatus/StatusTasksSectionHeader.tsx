import CustomSelect from '@/components/shared/CustomSelect'
import { Button } from '@/components/ui/button'
import AddTaskDialog from '@/components/dialogs/AddTaskDialog'
import { Plus } from 'lucide-react'
import { useSharedData } from '@/contexts/SharedDataContext'

const StatusTasksSectionHeader = () => {
  const {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    ALL_OPTION_ID,
  } = useSharedData()

  return (
    <header className='flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <h2 className='section-heading'>Tasks</h2>
        <AddTaskDialog>
          <Button className='flex justify-center items-center size-8 rounded-lg bg-primary hover:bg-primary/90'>
            <Plus />
          </Button>
        </AddTaskDialog>
      </div>

      <div className='space-y-1'>
        <label htmlFor='' className='text-sm font-semibold capitalize'>
          filter by category
        </label>
        <CustomSelect
          labels={[
            'all',
            ...(categories?.documents?.map((obj) => obj.category) || []),
          ]}
          values={[
            ALL_OPTION_ID,
            ...(categories?.documents?.map((obj) => obj.$id) || []),
          ]}
          value={selectedCategoryId}
          onValueChange={setSelectedCategoryId}
          placeholder='select category'
          className='w-[180px]'
        />
      </div>
    </header>
  )
}

export default StatusTasksSectionHeader
