import { motion } from 'framer-motion'

type Props = React.ComponentProps<'svg'> & {
  size: number
  progress: number
}

const RadialProgress: React.FC<Props> = ({
  size,
  progress,
  className,
  ...rest
}) => {
  const strokeWidth = size / 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = (1 - progress / 100) * circumference
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fontSize={strokeWidth}
      className={className}
      {...rest}
    >
      <circle
        cx={'50%'}
        cy={'50%'}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={'#eee'}
        fill='transparent'
      />

      <motion.circle
        cx={'50%'}
        cy={'50%'}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={'currentColor'}
        fill='transparent'
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <text
        x='50%'
        y='50%'
        fontSize='1.5em'
        fontWeight='bold'
        fill='#374151'
        textAnchor='middle'
        dy='.3em'
      >
        {progress}%
      </text>
    </svg>
  )
}

export default RadialProgress
