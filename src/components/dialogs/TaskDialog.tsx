import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

import { Textarea } from '../ui/textarea'
import CustomSelect from '../shared/CustomSelect'
import { Button } from '../ui/button'
import { useSharedData } from '@/contexts/SharedDataContext'
import { CategoryDocument, RawTaskDocument, StatusDocument } from '@/types/api'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '@/validation/TaskSchema'
import { cn } from '@/lib/utils'

export type TaskDialogProps = React.ComponentProps<typeof Dialog> & {
  initialTask: RawTaskDocument
  commonCategoryObject?: CategoryDocument
  commonStatusObject?: StatusDocument
  handleApiCall: (task: RawTaskDocument) => Promise<void | null>
  isLoading: boolean
  headerTitle: string
  buttonText: string
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  initialTask,
  commonCategoryObject,
  commonStatusObject,
  handleApiCall,
  isLoading,
  headerTitle,
  buttonText,
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RawTaskDocument>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialTask,
  })
  const [isOpen, setIsOpen] = useState(false)

  const { categories, statuses } = useSharedData()

  const onSubmit = async (formData: RawTaskDocument) => {
    const data = await handleApiCall({
      content: formData.content,
      category: formData.category,
      status: formData.status,
    })
    if (data === null) return
    console.log(formData)

    reset()
  }

  useEffect(() => {
    reset()
  }, [initialTask, open, isOpen, reset])

  return (
    <Dialog
      {...props}
      open={open || isOpen}
      onOpenChange={onOpenChange || setIsOpen}
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>
        </DialogHeader>

        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-5 py-4'>
            <div className='grid grid-cols-4 gap-x-3'>
              <label htmlFor='content' className='text-right'>
                content
              </label>
              <div className='col-span-3 space-y-1'>
                <Textarea
                  id='content'
                  cols={30}
                  rows={3}
                  placeholder='add content'
                  className={cn(errors.content && 'border-destructive')}
                  {...register('content')}
                />
                {errors.content && (
                  <p className='text-destructive text-sm'>
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-4 gap-x-3'>
              <label htmlFor='category' className='text-right'>
                category
              </label>
              <div className='col-span-3 space-y-1'>
                <Controller
                  name='category'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomSelect
                      id='category'
                      labels={
                        categories?.documents.map((obj) => obj.category) || []
                      }
                      values={categories?.documents.map((obj) => obj.$id) || []}
                      value={value}
                      onValueChange={onChange}
                      placeholder='select category'
                      disabled={!!commonCategoryObject}
                      className={cn(errors.category && 'border-destructive')}
                    />
                  )}
                />
                {errors.category && (
                  <p className='text-destructive text-sm'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-4 gap-x-3'>
              <label htmlFor='status' className='text-right'>
                status
              </label>
              <div className='col-span-3 space-y-1'>
                <Controller
                  name='status'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomSelect
                      id='status'
                      labels={
                        statuses?.documents.map((obj) => obj.status) || []
                      }
                      values={statuses?.documents.map((obj) => obj.$id) || []}
                      value={value}
                      onValueChange={onChange}
                      placeholder='select status'
                      disabled={!!commonStatusObject}
                    />
                  )}
                />

                {errors.status && (
                  <p className='text-destructive text-sm'>
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' disabled={isLoading || isSubmitting}>
              {buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
