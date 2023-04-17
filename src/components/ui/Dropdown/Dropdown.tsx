import { FC } from 'react'
import { Menu } from '@headlessui/react'

interface Dropdown {
  children: JSX.Element
  triggerElement: JSX.Element
}

const Dropdown: FC<Dropdown> = ({ children, triggerElement }) => {
  return (
    <Menu as="div" className="relative inline-block text-left p-1.5">
      <Menu.Button>{triggerElement}</Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg p-3">
        <Menu.Item disabled>{children}</Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default Dropdown
