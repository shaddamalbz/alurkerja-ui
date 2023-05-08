import classNames from 'classnames'
import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'

import '@/assets/scss/menu.scss'
import { ToggledButton } from '@/assets/icons'

interface SidenavProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logo?: ReactNode
  menuConfig: menuConfig[]
  toggled: boolean
  setToggled: Dispatch<SetStateAction<boolean>>
  width?: string | number
  /** current path from react router dom */
  path?: string
}

interface menuConfig {
  href: string
  label: string
  icon?: JSX.Element
}

const Sidebar: FC<SidenavProps> = ({ width, logo, menuConfig, toggled, className, setToggled, ...rest }) => {
  const RenderLogo = () => (
    <div
      className={classNames(
        'h-16 flex items-center font-bold tracking-wide sticky top-0 px-8',
        toggled ? 'justify-center' : 'justify-between'
      )}
    >
      {!toggled && <div>{logo ? logo : 'Lowcode'}</div>}

      <button onClick={() => setToggled((prev) => !prev)}>
        <ToggledButton />
      </button>
    </div>
  )

  return (
    <div
      className={classNames(
        'h-screen sticky z-10 top-0 transition-[width] ease-in-out duration-200 bg-[#1E1E2D] text-[#A2A3B7] border-r border-gray-200 w-20 hidden sm:block',
        !toggled && 'w-[270px]',
        className
      )}
      {...rest}
    >
      <RenderLogo />

      <div className="h-[calc(100vh-4rem)]">
        <div className="overflow-hidden w-full h-full">
          <div className="overflow-x-hidden overflow-y-auto scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
            <div className="px-4">
              {menuConfig.map((menu, idx) => (
                <div
                  className={classNames(
                    'menu-item hover:text-white',
                    window.location.pathname === menu.href ? 'menu-item-active' : ''
                  )}
                  style={{ height: '40px' }}
                  key={idx}
                >
                  <a
                    className={classNames('flex items-center h-full w-full gap-x-2', toggled && 'justify-center')}
                    href={menu.href}
                  >
                    {menu.icon && <span className="menu-icon">{menu.icon}</span>}
                    {!toggled && menu.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
