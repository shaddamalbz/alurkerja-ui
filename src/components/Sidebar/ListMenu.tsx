import { FC, Fragment } from 'react'
import { MenuConfig } from '@/types'
import Menu from './Menu'
import MenuWithSub from './MenuWithSub'

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
