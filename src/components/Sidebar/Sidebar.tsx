import classNames from 'classnames'
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

import { ToggledButton } from '@/assets/icons'

interface SidenavProps {
  logo?: ReactNode
  menuConfig: menuConfig[]
  toggled: boolean
  setToggled: Dispatch<SetStateAction<boolean>>
  width?: string | number
  /** current path from router.pathName from react-router-dom or next/router */
  currentPathName?: string
  className?: string
}

interface menuConfig {
  href: string
  label: string
  icon?: JSX.Element
}

const Sidebar: FC<SidenavProps> = ({
  width,
  logo,
  menuConfig,
  toggled,
  className,
  setToggled,
  currentPathName,
  ...rest
}) => {
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
            {menuConfig.map((menu, idx) => (
              <div
                className={classNames(
                  'cursor-pointer font-semibold px-8 rounded-md flex items-center w-full whitespace-nowrap gap-x-2 hover:text-white hover:bg-[#1B1B28] mb-2',
                  currentPathName === menu.href && 'text-white bg-[#1B1B28]'
                )}
                style={{ height: '40px' }}
                key={idx}
              >
                <a
                  className={classNames('flex items-center h-full w-full gap-x-2', toggled && 'justify-center')}
                  href={menu.href}
                >
                  {menu.icon && <span>{menu.icon}</span>}
                  {!toggled && menu.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
