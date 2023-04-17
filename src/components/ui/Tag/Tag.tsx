import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export interface TagProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  /** Tag prefix */
  prefix?: boolean | ReactNode
  /** Css class for Tag prefix, only available when prefix type is boolean */
  prefixClass?: string
  /** Tag suffix */
  suffix?: boolean | ReactNode
  /** Css class for Tag suffix, only available when suffix type is boolean */
  suffixClass?: string
}

/**
 * Tag - cused for categorize content with a keyword.
 */
const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { className, children, prefix, suffix, prefixClass, suffixClass, ...rest } = props
  return (
    <div
      className={classNames(
        'rounded-full py-1 px-2.5 border items-center border-gray-200 inline-flex gap-x-1 text-xs font-semibold whitespace-nowrap',
        className
      )}
      ref={ref}
      {...rest}
    >
      {prefix && typeof prefix === 'boolean' && (
        <span className={classNames('h-2 w-2 rounded-full bg-gray-300', prefixClass)} />
      )}
      {typeof prefix === 'object' && prefix}
      {children}
      {suffix && typeof suffix === 'boolean' && (
        <span className={classNames('h-2 w-2 rounded-full bg-gray-300', suffixClass)} />
      )}
      {typeof suffix === 'object' && suffix}
    </div>
  )
})

Tag.defaultProps = {
  prefix: false,
  suffix: false,
}

export default Tag
