import { ReactNode } from 'react'

function isReactNode(value: any): value is ReactNode {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value instanceof Array ||
    value instanceof Object
  )
}

export default isReactNode
