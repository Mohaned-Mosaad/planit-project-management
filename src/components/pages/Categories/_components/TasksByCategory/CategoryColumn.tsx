import { CategoryColumnHeader } from './_components/CategoryColumnHeader'
import { CategoryColumnBody } from './_components/CategoryColumnBody'
import { SelectionProvider } from '@/contexts'
import { CategoryDocument } from '@/types/api'
import { CategoryColumnProvider } from '@/contexts/components/CategoryColumnContext'

type Props = {
  categoryObject: CategoryDocument
} & React.ComponentProps<'div'>

const CategoryColumn: React.FC<Props> = ({ categoryObject }) => {
  return (
    <CategoryColumnProvider categoryObject={categoryObject}>
      <SelectionProvider columnObject={categoryObject}>
        <div className={'relative space-y-4 p-3 bg-gray-100 rounded-xl'}>
          <CategoryColumnHeader />

          <CategoryColumnBody />
        </div>
      </SelectionProvider>
    </CategoryColumnProvider>
  )
}

export default CategoryColumn
