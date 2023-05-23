import { Children, cloneElement, Fragment, ReactNode } from 'react'
import classNames from 'classnames'
import Avatar, { AvatarProps } from './Avatar'

import '@/assets/scss/avatar.scss'

const GroupContainer = ({
  children,
  chained,
  className,
}: {
  children: ReactNode
  chained: boolean
  className?: string
}) => <div className={classNames('avatar-group', chained && 'avatar-group-chained', className)}>{children}</div>

interface AvatarGroupProps {
  maxCount?: number
  chained?: boolean
  className?: string
  children: any
  omittedAvatarProps?: AvatarProps
  onOmittedAvatarClick?: () => void
}

const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    maxCount = 3,
    chained = false,
    className,
    onOmittedAvatarClick,
    omittedAvatarProps,

    children,
  } = props

  const childCount = Children.count(children)

  const childWithKey = Children.toArray(children).map((child: any, index) =>
    cloneElement(child, {
      key: `grouped-avatar-${index}`,
    })
  )

  if (maxCount && maxCount < childCount) {
    const childToShow = childWithKey.slice(0, maxCount)

    const avatar = (
      <Avatar
        className={onOmittedAvatarClick ? 'cursor-pointer' : ''}
        onClick={() => onOmittedAvatarClick?.()}
        {...omittedAvatarProps}
      ></Avatar>
    )

    childToShow.push(<Fragment key="avatar-more-tooltip">{avatar}</Fragment>)
    return (
      <GroupContainer className={className} chained={chained}>
        {childToShow}
      </GroupContainer>
    )
  }

  return (
    <GroupContainer className={className} chained={chained}>
      {children}
    </GroupContainer>
  )
}

export default AvatarGroup
