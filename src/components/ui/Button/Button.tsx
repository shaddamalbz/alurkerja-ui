import { MouseEvent, ButtonHTMLAttributes, forwardRef, ReactNode, Fragment } from 'react'

// components
import Spinner from '@/components/ui/Spinner'

// utils
import { CONTROL_SIZES } from '@/utils/constant'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Represents button is being active by user action */
  active?: boolean
  /** Display spinner */
  loading?: boolean
  /** disabled user action */
  disabled?: boolean
  /** padding size */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: ReactNode
  /** border radius */
  shape?: 'base' | 'none' | 'sm' | 'md' | 'lg' | 'full'
}

/**
 * Button components
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, loading, disabled, onClick, className, active, size, icon, shape, ...rest } = props

  const classes: string[] = [
    className || 'bg-white border border-gray-300 text-gray-600 active:bg-gray-100 hover:bg-gray-50',
  ]

  const defaultClass = 'button'
  const sizeIconClass = 'inline-flex items-center justify-center'
  const disabledClass = 'opacity-50 cursor-not-allowed'

  const getButtonSize = () => {
    let sizeClass = ''
    switch (size) {
      case 'xs':
        sizeClass = `h-${CONTROL_SIZES.xs} ${
          icon && !children ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base p-2` : 'px-3 py-1 text-xs'
        }`
        break
      case 'sm':
        sizeClass = `h-${CONTROL_SIZES.sm} ${
          icon && !children ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg` : 'px-3 py-2 text-sm'
        }`
        break
      case 'md':
        sizeClass = `h-${CONTROL_SIZES.md} ${
          icon && !children ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl` : 'px-8 py-2 text-base'
        }`
        break
      default:
        sizeClass = `h-${CONTROL_SIZES.md} ${
          icon && !children ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl` : 'px-8 py-2 text-base'
        }`
        break
    }
    return sizeClass
  }

  const buttonSize = () => {
    return getButtonSize()
  }

  const buttonShape = () => {
    if (shape === 'base') {
      return 'rounded'
    } else {
      return `rounded-${shape}`
    }
  }

  const buttonClass = () => {
    return `${defaultClass} ${classes.join(' ')} ${buttonSize()} ${buttonShape()} ${disabled && disabledClass}`
  }

  const renderChildren = () => {
    if (loading && children) {
      return (
        <span className="flex items-center justify-center gap-x-0.5">
          <Spinner />
          {children}
        </span>
      )
    } else if (icon) {
      return (
        <span className="flex items-center justify-center gap-x-0.5">
          {icon}
          {children}
        </span>
      )
    } else if (icon && !children) {
      return icon
    }
    return <Fragment>{children}</Fragment>
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick && onClick(e)
  }

  return (
    <button className={buttonClass()} ref={ref} onClick={handleClick} {...rest}>
      {renderChildren()}
    </button>
  )
})

Button.defaultProps = {
  shape: 'base',
  size: 'md',
  active: false,
  loading: false,
  disabled: false,
}

export default Button
