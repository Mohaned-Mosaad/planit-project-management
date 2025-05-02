import { Dialog } from '@/components/ui/dialog'

import React from 'react'
import useEditCategory from '@/hooks/api/categories/useEditCategory'

import { useCategoryColumn } from '@/contexts/components/CategoryColumnContext'
import CategoryDialog from './CategoryDialog'
import { RawCategoryDocument } from '@/types/api'

type DialogProps = React.ComponentProps<typeof Dialog>

const EditCategoryDialog: React.FC<DialogProps> = ({
  children,
  open,
  onOpenChange,
  ...rest
}) => {
  const { categoryObject } = useCategoryColumn()

  const { editCategory, isLoading } = useEditCategory()

  async function handleEdit(category: RawCategoryDocument) {
    const data = await editCategory(categoryObject.$id, category)
    if (data === null) return
  }

  return (
    <CategoryDialog
      initialCategory={{ category: categoryObject.category }}
      open={open}
      onOpenChange={onOpenChange}
      headerTitle='Edit category'
      buttonText='Save changes'
      handleApiCall={handleEdit}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </CategoryDialog>
  )
}

export default EditCategoryDialog
