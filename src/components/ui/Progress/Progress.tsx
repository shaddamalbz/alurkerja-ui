import React from 'react'
import classNames from 'classnames'
import Line from './Line'
import Circle from './Circle'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress variants */
  variant?: 'line' | 'circle'
  /** The current value of progress */
  percent: number
  /** Whether to display progress info */
  showInfo?: boolean
  /** Size of progress bar (only applicable when variant="line") */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Determine the size of circular progress (only applicable when variant="circle") */
  width?: number
  /** Width of the circular progress (only applicable when variant="circle") */
  strokeWidth?: number
  /**	Style of the progress linecap (only applicable when variant="circle") */
  strokeLinecap?: 'inherit' | 'butt' | 'round' | 'square'
  /** Custom color for Progress, available colors option based on tailwind */
  color?: string
  /** The gap degree of circle progress (only applicable when variant="circle") */
  gapDegree?: number
  /** Gap postion of circle progress (only applicable when variant="circle") */
  gapPosition?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * A Progress loader show the progression of an operation flow in visual way.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { variant, color, percent, showInfo, className, width } = props

  const strokeColor = color || 'indigo-600'

  const progressClass = classNames(
    'inline-block',
    className,
    variant === 'circle' ? 'relative w-full' : 'relative w-full flex items-center'
  )

  const renderProcessInfo = () => {
    if (!showInfo) {
      return null
    }
    return <span className={`ml-2 mr-2 ${variant}`}>{`${percent}%`}</span>
  }

  const renderProgress = (direction?: 'top' | 'right' | 'bottom' | 'left') => {
    const progressInfo = renderProcessInfo()
    let progress

    if (variant === 'line') {
      progress = (
        <Line strokeColor={strokeColor} direction={direction} {...props}>
          {progressInfo}
        </Line>
      )
    }

    if (variant === 'circle') {
      progress = (
        <Circle strokeColor={strokeColor} width={width} {...props}>
          {progressInfo}
        </Circle>
      )
    }

    return progress
  }

  return (
    <div ref={ref} className={progressClass}>
      {renderProgress()}
    </div>
  )
})

Progress.defaultProps = {
  variant: 'line',
  percent: 0,
  showInfo: true,
  size: 'md',
  strokeLinecap: 'round',
  strokeWidth: 6,
  width: 120,
  gapDegree: 0,
  gapPosition: 'top',
}

export default Progress
