import { FC, useState } from 'react'
import classNames from 'classnames'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { MenuConfig } from '@/types'
import ListMenu from './ListMenu'

const MenuWithSub: FC<{
  currentPathName?: string
  toggled: boolean
  menu: MenuConfig
}> = ({ menu, toggled, currentPathName }) => {
  const [showSub, setShowSub] = useState(false)
  return (
    <>
      <div
        className={classNames(
          'cursor-pointer font-semibold px-8 rounded-md flex items-center justify-between w-full whitespace-nowrap gap-x-2 hover:text-white hover:bg-[#1B1B28] mb-2',
          currentPathName === menu.href && 'text-white bg-[#1B1B28]'
        )}
        style={{ height: '40px' }}
        onClick={() => setShowSub((prev) => !prev)}
      >
        <div className={classNames('flex items-center h-full w-full gap-x-2', toggled && 'justify-center')}>
          {menu.icon && <span>{menu.icon}</span>}
          {!toggled && menu.label}
        </div>
        {showSub ? <HiChevronUp /> : <HiChevronDown />}
      </div>
      {showSub && menu.child && (
        <div className="px-4 text-sm">
          <ListMenu menuConfig={menu.child} toggled={toggled} />
        </div>
      )}
    </>
  )
}

export default MenuWithSub
