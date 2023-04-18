import React, { forwardRef } from 'react'
import classNames from 'classnames'

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Appearance of Skeleton */
  variant?: 'circle' | 'block'
  /** Height of Skeleton */
  height?: number | string
  /** Width of Skeleton */
  width?: number | string
  /** Whether to active animation */
  animation?: boolean
}

/**
 * Display a placeholder preview of component before the data gets loaded, it can help to the user aware and that the data is processing.
 */
const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>((props, ref) => {
  const { animation, className, height, style, variant, width } = props
  return (
    <span
      ref={ref}
      className={classNames(
        'bg-gray-200 flex',
        variant === 'circle' && 'rounded-full w-10 h-10',
        variant === 'block' && 'rounded-lg h-2.5 w-full',
        animation && 'animate-pulse',
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
    />
  )
})

Skeleton.defaultProps = {
  variant: 'block',
  animation: true,
}

export default Skeleton
