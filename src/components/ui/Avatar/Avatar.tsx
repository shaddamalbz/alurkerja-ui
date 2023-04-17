import { useState, useEffect, useRef, forwardRef, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

import '@/assets/scss/avatar.scss'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: 'rounded' | 'square' | 'circle'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  src?: string
  srcSet?: string
  alt?: string
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const { size, src, srcSet, shape, alt, className, icon, ...rest } = props
  let { children } = props
  const avatarChildren = useRef<HTMLSpanElement | null>()
  const avatarNode = useRef<HTMLSpanElement | null>()

  const [scale, setScale] = useState(1)

  const innerScale = () => {
    if (!avatarChildren.current || !avatarNode.current) {
      return
    }
    const avatarChildrenWidth = avatarChildren.current.offsetWidth
    const avatarNodeWidth = avatarNode.current.offsetWidth
    if (avatarChildrenWidth === 0 || avatarNodeWidth === 0) {
      return
    }
    setScale(avatarNodeWidth - 8 < avatarChildrenWidth ? (avatarNodeWidth - 8) / avatarChildrenWidth : 1)
  }

  const classes = classNames('avatar', `avatar-${shape}`, typeof size === 'string' ? `avatar-${size}` : '', className)

  const sizeStyle =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          minWidth: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 12,
        }
      : {}

  useEffect(() => {
    innerScale()
  }, [scale, children])

  if (src) {
    children = <img className={`avatar-img avatar-${shape}`} src={src} srcSet={srcSet} alt={alt} loading="lazy" />
  } else if (icon) {
    children = <span className={classNames('avatar-icon', `avatar-icon-${size}`)}>{icon}</span>
  } else {
    const childrenSizeStyle = typeof size === 'number' ? { lineHeight: `${size}px` } : {}
    const stringCentralized = { transform: `translateX(-50%) scale(${scale})` }
    children = (
      <span
        className={`avatar-string ${typeof size === 'number' ? '' : `avatar-inner-${size}`}`}
        style={{ ...childrenSizeStyle, ...stringCentralized, ...(typeof size === 'number' ? { height: size } : {}) }}
        ref={(node) => {
          avatarChildren.current = node
        }}
      >
        {children}
      </span>
    )
  }

  return (
    <span className={classes} style={{ ...sizeStyle, ...rest.style }} {...rest}>
      {children}
    </span>
  )
})

Avatar.defaultProps = {
  shape: 'rounded',
  size: 'md',
}

export default Avatar
