import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'

export interface HamburgerButtonProps {
  className?: string
  toggled: boolean
  setToggled: Dispatch<SetStateAction<boolean>>
}

const HamburgerButton = ({ toggled, setToggled, className }: HamburgerButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(className, 'text-gray-400 hover:text-gray-600 hover:bg-gray-200 hover:rounded-full p-2')}
      onClick={() => setToggled(!toggled)}
    >
      {toggled ? <HiOutlineMenu size={24} /> : <HiOutlineMenuAlt2 size={24} />}
    </button>
  )
}

HamburgerButton.defaultProps = {
  toogle: false,
}

export default HamburgerButton
