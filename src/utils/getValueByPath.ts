import { isReactNode } from '@/utils'

function getValueByPath(obj: { [x: string]: any }, path: string) {
  const value = path.split('.').reduce((acc: any, val: string) => {
    return acc ? acc[val] : null
  }, obj)

  if (isReactNode(value)) {
    return value
  }

  return null
}

export default getValueByPath
