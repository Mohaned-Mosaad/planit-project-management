import React, { forwardRef, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { cn } from '@/lib/utils'

import { X } from 'lucide-react'
import { useSelect } from '@/contexts/SelectionContext'

type Props = {
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  ['data-state']: 'open' | 'closed'
} & React.ComponentProps<'div'>

const SelectionBar: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  (
    { className, setIsDeleteDialogOpen, ['data-state']: dataState, ...rest },
    ref
  ) => {
    const { selectedTasks, resetSelection } = useSelect()

    const [shouldRender, setShouldRender] = React.useState(false)

    useEffect(() => {
      if (dataState === 'open') {
        setShouldRender(true)
      } else {
        const timeout = setTimeout(() => setShouldRender(false), 100) // match Tailwind animation
        return () => clearTimeout(timeout)
      }
    }, [dataState])

    if (!shouldRender) return null
    return (
      <div
        className={cn(
          'flex gap-4 justify-between items-center p-3 rounded-lg bg-gray-500 text-white',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        ref={ref}
        data-state={dataState}
        {...rest}
      >
        <div className='flex gap-2 items-center'>
          <button onClick={resetSelection}>
            <X />
          </button>

          <span>{selectedTasks.length} selected</span>
        </div>

        <button onClick={() => setIsDeleteDialogOpen(true)}>
          <FaTrashAlt />
        </button>
      </div>
    )
  }
)

SelectionBar.displayName = 'SelectionBar'

export default SelectionBar
