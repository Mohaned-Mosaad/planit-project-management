import { useEffect, useRef } from 'react'

type ClickOutsideDetectorProps = React.ComponentPropsWithoutRef<'div'> & {
  onClickOutside: () => void
  exceptionRefs?: React.RefObject<HTMLElement>[] // Elements to exclude
  children: React.ReactNode
}

const ClickOutsideDetector: React.FC<ClickOutsideDetectorProps> = ({
  onClickOutside,
  exceptionRefs = [],
  children,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is inside any exception element
      if (
        exceptionRefs.some((ref) => ref.current?.contains(event.target as Node))
      ) {
        return
      }

      if (containerRef.current?.contains(event.target as Node)) {
        return
      }

      onClickOutside()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside, exceptionRefs])

  return (
    <div ref={containerRef} {...rest}>
      {children}
    </div>
  )
}

export default ClickOutsideDetector
