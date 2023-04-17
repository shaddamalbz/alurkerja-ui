import { forwardRef, HTMLAttributes } from 'react'
import { HiX } from 'react-icons/hi'

export interface CloseButtonProps extends HTMLAttributes<HTMLSpanElement> {
  // generate component with default style
  defaultStyle?: boolean
  // set components to be absolute to parent
  absolute?: boolean
}

/**
 * CloseButton - button with cross icon
 */
const CloseButton = forwardRef<HTMLSpanElement, CloseButtonProps>((props, ref) => {
  const { className, defaultStyle, absolute, ...rest } = props
  return (
    <span
      className={`cursor-pointer${absolute ? ' absolute z-10 outline-none' : ''}${
        defaultStyle ? ' text-xl rounded p-1 text-gray-400 hover:text-gray-600' : ''
      } ${className || ''}`}
      ref={ref}
      {...rest}
    >
      <HiX />
    </span>
  )
})

export default CloseButton
