import { FC, Fragment } from 'react'
import { MenuConfig } from '@/types'
import Menu from './Menu'
import MenuWithSub from './MenuWithSub'
import classNames from 'classnames'

interface ListMenuProps {
  menuConfig: MenuConfig[]
  currentPathName?: string
  toggled: boolean
}

const ListMenu: FC<ListMenuProps> = ({ menuConfig, currentPathName, toggled }) => {
  return (
    <>
      {menuConfig.map((menu, idx) => (
        <Fragment key={idx}>
          {!toggled && menu.groupBy && (
            <div className="mt-5 w-full h-10 text-[#4c4e6f] font-semibold flex items-center px-8">{menu.groupBy}</div>
          )}
          {!menu.child ? (
            <Menu menu={menu} toggled={toggled} currentPathName={currentPathName} />
          ) : (
            <MenuWithSub menu={menu} toggled={toggled} currentPathName={currentPathName} />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default ListMenu
