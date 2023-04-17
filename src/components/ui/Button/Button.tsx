import { MouseEvent, ButtonHTMLAttributes, forwardRef, ReactNode, Fragment } from 'react'

// components
import Spinner from '@/components/ui/Spinner'

// utils
import { CONTROL_SIZES } from '@/utils/constant'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** theme */
  variant?: 'default' | 'solid'
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
  /** custom color ex: red-600 */
  color?: string
}

interface GetButtonColor {
  bgColor: string
  hoverColor: string
  activeColor: string
  textColor: string
}

/**
 * Button components
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, loading, disabled, onClick, className, active, variant, size, icon, shape, color, ...rest } = props

  const classes: string[] = [className || '']

  const defaultClass = 'button'
  const sizeIconClass = 'inline-flex items-center justify-center'
  const disabledClass = 'opacity-50 cursor-not-allowed'

  const getBtnColor = ({ bgColor, hoverColor, activeColor, textColor }: GetButtonColor) => {
    return `${bgColor} ${disabled || loading ? disabledClass : hoverColor + ' ' + activeColor} ${textColor}`
  }

  const defaultColor = () => {
    const btn = {
      bgColor: active ? `bg-gray-100 border border-gray-300 ` : `bg-white border border-gray-300 `,
      textColor: `text-gray-600 `,
      hoverColor: active ? '' : `hover:bg-gray-50 `,
      activeColor: `active:bg-gray-100 `,
    }
    return getBtnColor(btn)
  }

  const solidColor = () => {
    const btn = {
      bgColor: active ? (color ? '' : `bg-indigo-700`) : color ? color : 'bg-indigo-600',
      textColor: 'text-white',
      hoverColor: active ? '' : color ? '' : `hover:bg-indigo-500`,
      activeColor: color ? '' : `active:bg-indigo-700`,
    }
    return getBtnColor(btn)
  }

  const btnColor = () => {
    switch (variant) {
      case 'solid':
        return solidColor()
      case 'default':
        return defaultColor()
      default:
        return defaultColor()
    }
  }

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
    return `${defaultClass} ${classes.join(' ')} ${btnColor()} ${buttonSize()} ${buttonShape()}`
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
  variant: 'default',
  shape: 'base',
  size: 'md',
  active: false,
  loading: false,
  disabled: false,
}

export default Button
