import { describe, it } from 'vitest'
import { getValueByPath } from '@/utils'

describe('getValueByPath()', () => {
  it('return correct value with non nested key', () => {
    const obj = {
      age: 1,
    }
    expect(getValueByPath(obj, 'age')).toEqual(1)
  })

  it('return correct value with nested 2 key', () => {
    const obj = {
      name: {
        first: 'Shaddam',
        last: 'Alghafiqih',
      },
    }
    expect(getValueByPath(obj, 'name.first')).toEqual('Shaddam')
  })

  it('return correct value with nested 3 key', () => {
    const obj = {
      bio: {
        hobby: {
          category: 'sport',
        },
      },
    }
    expect(getValueByPath(obj, 'bio.hobby.category')).toEqual('sport')
  })
})
