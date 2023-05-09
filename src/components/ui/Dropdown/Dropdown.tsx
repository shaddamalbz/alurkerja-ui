import { FC, ReactNode } from 'react'
import { Menu } from '@headlessui/react'

interface Dropdown {
  triggerElement: JSX.Element
  menu: DropdownMenu[]
}

interface DropdownMenu {
  label: string
  href: string
  icon?: ReactNode
  onClick?: () => void
}

const Dropdown: FC<Dropdown> = ({ triggerElement, menu }) => {
  return (
    <Menu as="div" className="relative inline-block text-left p-1.5">
      <Menu.Button>{triggerElement}</Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg p-3 space-y-2">
        {menu.map(({ href, label, icon, onClick }) => (
          <Menu.Item>
            <div className="flex items-center gap-4 hover hover:bg-gray-100 p-2 rounded">
              {icon}
              {onClick ? <button onClick={onClick}>{label}</button> : <a href={href}>{label}</a>}
            </div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

export default Dropdown
