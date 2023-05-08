import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

import '@/assets/scss/menu.scss'

interface SidenavProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logo?: ReactNode
  menuConfig: menuConfig[]
  toggled: boolean
  width?: string | number
  /** current path from react router dom */
  path?: string
}

interface menuConfig {
  href: string
  label: string
  icon?: JSX.Element
}

const Sidenav: FC<SidenavProps> = ({ width, logo, menuConfig, toggled, className, ...rest }) => {
  const RenderLogo = () => (
    <div className="h-16 flex items-center justify-center font-bold tracking-wide sticky top-0">
      {logo ? logo : 'Lowcode'}
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
          <div className="overflow-y-auto scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
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

export default Sidenav
