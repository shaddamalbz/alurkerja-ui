import { forwardRef, HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** handle max count on badge, when passed it then return with +  */
  maxCount: number
  /** content like avatar */
  content: string | number
}

/**
 * Badge components
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { content, children, maxCount, ...rest } = props

  const dot = typeof content !== 'number' && typeof content !== 'string'

  if (children) {
    return (
      <span className="relative flex w-fit">
        <span
          className={`absolute transform top-0 right-0 -translate-y-1/4  rounded-full px-2 py-0.5 text-xs bg-red-500 text-white ${
            dot
              ? 'rounded-full text-xs bg-red-500 text-white w-2 h-2'
              : 'rounded-full px-2 py-0.5 text-xs bg-red-500 text-white'
          }`}
        >
          {typeof content === 'number' && content > maxCount ? `${maxCount}+` : content}
        </span>
        {children}
      </span>
    )
  }
  return (
    <span
      className={
        dot
          ? 'rounded-full text-xs bg-red-500 text-white w-2 h-2'
          : 'rounded-full px-2 py-0.5 text-xs bg-red-500 text-white'
      }
      ref={ref}
      {...rest}
    >
      {typeof content === 'number' && content > maxCount ? `${maxCount}+` : content}
    </span>
  )
})

Badge.defaultProps = {
  maxCount: 99,
}

export default Badge
