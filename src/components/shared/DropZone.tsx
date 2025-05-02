import { useDrag } from '@/contexts/DragContext'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

type DropZoneProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode
  handleApiCallOnDrop: (e: React.DragEvent) => void
}

const DropZone: React.FC<DropZoneProps> = ({
  className,
  handleApiCallOnDrop,
  children,
  ...props
}) => {
  const { draggedData } = useDrag()

  const [isOnDropZone, setIsOnDropZone] = useState(false)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const dragCountRef = useRef(0)

  const handleOnDragOver = (e: React.DragEvent) => {
    e.stopPropagation()

    if (draggedData) {
      e.preventDefault()
    }
  }

  const handleOnDragEnter = () => {
    if (draggedData) {
      dragCountRef.current++
      if (dragCountRef.current > 0) {
        setIsOnDropZone(true)
      }
    } else {
      setIsOnDropZone(false)
    }
  }

  const handleOnDragLeave = () => {
    dragCountRef.current--
    if (dragCountRef.current <= 0) {
      setIsOnDropZone(false)
      dragCountRef.current = 0
    }
  }
  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation()

    dragCountRef.current = 0
    setIsOnDropZone(false)
    handleApiCallOnDrop(e)
  }

  return (
    <div
      ref={dropZoneRef}
      className={cn(
        `transition duration-200`,
        isOnDropZone && 'drag-over',
        className
      )}
      onDragOver={handleOnDragOver}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      {...props}
    >
      {children}
    </div>
  )
}

export default DropZone
