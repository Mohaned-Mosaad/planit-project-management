import { Dialog } from '@/components/ui/dialog'

import { useAddCategory } from '@/hooks/api/categories'

import CategoryDialog from './CategoryDialog'
import { RawCategoryDocument } from '@/types/api'

const AddCategoryDialog: React.FC<React.ComponentProps<typeof Dialog>> = ({
  children,
  open,
  onOpenChange,
  ...rest
}) => {
  const { addCategory, isLoading } = useAddCategory()

  async function handleAdd(category: RawCategoryDocument) {
    const data = await addCategory(category)
    if (data === null) return null
  }

  return (
    <CategoryDialog
      initialCategory={{ category: '' }}
      open={open}
      onOpenChange={onOpenChange}
      headerTitle='Add category'
      buttonText='Add'
      handleApiCall={handleAdd}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </CategoryDialog>
  )
}

export default AddCategoryDialog
