import AddCategoryDialog from '../../../../dialogs/AddCategoryDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CustomSelect from '@/components/shared/CustomSelect'
import { useSharedData } from '@/contexts/SharedDataContext'

const CategoriesSectionHeader = () => {
  const { statuses, selectedStatusId, setSelectedStatusId, ALL_OPTION_ID } =
    useSharedData()

  return (
    <header className='flex justify-between'>
      <div className='flex gap-2 items-center'>
        <h2 className='section-heading'>categories</h2>

        <AddCategoryDialog>
          <Button className='flex justify-center items-center size-8 rounded-lg bg-primary hover:bg-primary/90'>
            <Plus />
          </Button>
        </AddCategoryDialog>
      </div>

      <div className='space-y-1'>
        <label htmlFor='' className='text-sm font-semibold capitalize'>
          filter by status:
        </label>
        <CustomSelect
          labels={[
            'all',
            ...(statuses?.documents?.map((obj) => obj.status) || []),
          ]}
          values={[
            ALL_OPTION_ID,
            ...(statuses?.documents?.map((obj) => obj.$id) || []),
          ]}
          value={selectedStatusId}
          onValueChange={setSelectedStatusId}
          placeholder='select status'
          className='w-[180px]'
        />
      </div>
    </header>
  )
}

export default CategoriesSectionHeader
