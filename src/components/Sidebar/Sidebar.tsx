import classNames from 'classnames'
import { Dispatch, ReactNode, SetStateAction, forwardRef, useImperativeHandle, useRef } from 'react'

import { ToggledButton } from '@/assets/icons'
import { MenuConfig } from '@/types'

import ListMenu from './ListMenu'

interface SidebarProps {
  logo?: ReactNode
  menuConfig: MenuConfig[]
  toggled: boolean
  setToggled: Dispatch<SetStateAction<boolean>>
  width?: string | number
  /** current path from router.pathName from react-router-dom or next/router */
  currentPathName?: string
  className?: string
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ width, logo, menuConfig, toggled, className, setToggled, currentPathName, ...rest }, ref) => {
    const RenderLogo = () => (
      <div className="h-16 flex items-center font-bold tracking-wide top-0 px-8 justify-between">
        {!toggled && <div>{logo ? logo : 'Lowcode'}</div>}
      </div>
    )

    return (
      <div
        className={classNames(
          'h-screen z-10 top-0 transition-[width] ease-in-out duration-200 bg-[#1E1E2D] text-[#A2A3B7] hidden sm:block relative',
          !toggled ? 'w-[270px]' : 'w-20',
          className
        )}
        ref={ref}
        {...rest}
      >
        <RenderLogo />
        <button
          className="h-[30px] w-[30px]  absolute right-0 top-0 translate-y-5  translate-x-1/2 bg-white rounded shadow mx-auto"
          onClick={() => setToggled((prev) => !prev)}
        >
          <div
            className={classNames(
              'w-fit mx-auto transition-transform ease-in-out duration-500',
              toggled && 'rotate-180'
            )}
          >
            <ToggledButton active={toggled} />
          </div>
        </button>
        <div className="h-[calc(100vh-4rem)] ">
          <div className="w-full h-full">
            <div className="scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
              <ListMenu menuConfig={menuConfig} toggled={toggled} currentPathName={currentPathName} />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default Sidebar
