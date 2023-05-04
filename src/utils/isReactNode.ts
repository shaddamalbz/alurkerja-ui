import { ReactNode } from 'react'

function isValidReactNode(value: any): value is ReactNode {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value instanceof Array ||
    value instanceof Object
  )
}

export default isValidReactNode
