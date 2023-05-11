import React, { FC } from 'react'
import classNames from 'classnames'
import { MenuConfig } from '@/types'

const Menu: FC<{
  menu: MenuConfig
  currentPathName?: string
  toggled: boolean
}> = ({ menu, toggled, currentPathName }) => {
  return (
    <a
      href={menu.href}
      className={classNames(
        'cursor-pointer font-semibold px-8 rounded-md flex items-center w-full whitespace-nowrap gap-x-2 hover:text-white hover:bg-[#1B1B28] mb-2',
        currentPathName === menu.href && 'text-white bg-[#1B1B28]'
      )}
      style={{ height: '40px' }}
    >
      <div className={classNames('flex items-center h-full w-full gap-x-2', toggled && 'justify-center')}>
        {menu.icon && <span>{menu.icon}</span>}
        {!toggled && menu.label}
      </div>
    </a>
  )
}

export default Menu
