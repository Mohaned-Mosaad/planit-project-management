import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import React, { forwardRef } from 'react'

type DialogProps = React.ComponentPropsWithoutRef<typeof AlertDialog> & {
  handleDelete: () => void
  isLoading: boolean
  alertDescription?: string
}

const DeleteDialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ handleDelete, isLoading, alertDescription, children, ...rest }, ref) => {
    return (
      <AlertDialog {...rest}>
        {children && (
          <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        )}

        <AlertDialogContent ref={ref}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to proceed deletion?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertDescription
                ? alertDescription
                : "This action can't be undone. This will permanently delete your data from our server."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/80'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)

DeleteDialog.displayName = 'DeleteDialog'

export default DeleteDialog
