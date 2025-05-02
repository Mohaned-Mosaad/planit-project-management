import { AnimatePresence, motion } from 'framer-motion'
import React, { ElementType, Fragment } from 'react'

type Props = {
  isLoading: boolean
  loaderComponent: React.ReactNode
  children: React.ReactNode
  loadersCount?: number
  loaderAs?: ElementType
}

const LoadersInitiator: React.FC<Props> = ({
  isLoading,
  loaderComponent,
  children,
  loadersCount = 1,
  loaderAs = 'div',
}) => {
  const MotionComponent = motion.create(loaderAs)

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <Fragment key='loader'>
          {[...Array(loadersCount)].map((_, idx) => (
            <MotionComponent
              key={`loader-${idx}`}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {loaderComponent}
            </MotionComponent>
          ))}
        </Fragment>
      ) : (
        <Fragment key='children'>{children}</Fragment>
      )}
    </AnimatePresence>
  )
}

export default LoadersInitiator
