import classNames from 'classnames'
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

import { ToggledButton } from '@/assets/icons'
import { MenuConfig } from '@/types'

import ListMenu from './ListMenu'

interface SidenavProps {
  logo?: ReactNode
  menuConfig: MenuConfig[]
  toggled: boolean
  setToggled: Dispatch<SetStateAction<boolean>>
  width?: string | number
  /** current path from router.pathName from react-router-dom or next/router */
  currentPathName?: string
  className?: string
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
        'h-screen sticky z-10 top-0 transition-[width] ease-in-out duration-200 bg-[#1E1E2D] text-[#A2A3B7] border-r border-gray-200  hidden sm:block',
        !toggled ? 'w-[270px]' : 'w-20',
        className
      )}
      {...rest}
    >
      <RenderLogo />

      <div className="h-[calc(100vh-4rem)]">
        <div className="overflow-hidden w-full h-full">
          <div className="overflow-x-hidden overflow-y-auto scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
            <ListMenu menuConfig={menuConfig} toggled={toggled} currentPathName={currentPathName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
