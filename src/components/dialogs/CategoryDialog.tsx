import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RawCategoryDocument } from '@/types/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema } from '@/validation/CategorySchema'
import { cn } from '@/lib/utils'

type CategoryDialogProps = React.ComponentProps<typeof Dialog> & {
  initialCategory: RawCategoryDocument
  handleApiCall: (category: RawCategoryDocument) => Promise<void | null>
  isLoading: boolean
  headerTitle: string
  buttonText: string
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  handleApiCall,
  isLoading,
  headerTitle,
  buttonText,
  initialCategory,
  open,
  onOpenChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RawCategoryDocument>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialCategory,
  })

  const onSubmit = async (formData: RawCategoryDocument) => {
    const data = await handleApiCall({ category: formData.category })
    if (data === null) return
    reset()
  }

  useEffect(() => {
    reset()
  }, [initialCategory, open, isOpen, reset])

  return (
    <Dialog open={open || isOpen} onOpenChange={onOpenChange || setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>
        </DialogHeader>

        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 gap-x-3'>
              <label htmlFor='category' className='text-right'>
                category
              </label>
              <div className='col-span-3 space-y-1'>
                <Input
                  className={cn(errors.category && 'border-destructive')}
                  type='text'
                  id='category'
                  placeholder='add category'
                  {...register('category')}
                />
                {errors.category && (
                  <p className='text-destructive text-sm'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' disabled={isSubmitting || isLoading}>
              {buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CategoryDialog
