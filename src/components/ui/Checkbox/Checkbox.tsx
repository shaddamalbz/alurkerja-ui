import axios from 'axios'
import classNames from 'classnames'
import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  listOptionWithAPI?: {
    url: string
    nameKey: string
    valueKey: string
    labelKey: string
  }
  listOption?: ListOption[]
  onChange?: (value: { [x: string]: string | number | boolean }) => void
}

interface ListOption {
  name: string
  label: string
  value: string | number | boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { listOption, listOptionWithAPI, className, onChange, ...rest } = props

  const [value, setValue] = useState<{ [x: string]: string | number | boolean }>()
  const [optionsFromAPI, setOptionFromAPI] = useState<ListOption[]>()

  useEffect(() => {
    if (value) {
      onChange?.(value)
    }
  }, [value])

  const getData = useCallback(async () => {
    if (listOptionWithAPI) {
      const { labelKey, nameKey, url, valueKey } = listOptionWithAPI
      const { status, data } = await axios.get(url)
      if (status === 200) {
        const result = data.data.content.map((item: any) => {
          return { name: item[nameKey], label: item[labelKey], value: item[valueKey] }
        })
        setOptionFromAPI(result)
      }
    }
  }, [listOptionWithAPI])

  useEffect(() => {
    getData()
  }, [])

  const options = useMemo(() => {
    if (optionsFromAPI) {
      return optionsFromAPI
    }
    return listOption
  }, [optionsFromAPI, listOption])

  return (
    <div className="flex items-center gap-x-2">
      {options?.map((option, idx) => (
        <div key={idx}>
          <input
            ref={ref}
            type="checkbox"
            className={classNames(
              'form-checkbox rounded bg-[#EBEDF3] text-indigo-600 border-none focus:border-none focus:outline-indigo-600 mr-2',
              className
            )}
            onChange={(e) =>
              setValue((prev) => {
                if (prev) {
                  if (!e.target.checked) {
                    delete prev[option.name]
                    return { ...prev }
                  }
                  return { ...prev, [option.name]: option.value }
                }
                return { [option.name]: option.value }
              })
            }
            {...rest}
          />
          <label htmlFor={option.name}>{option.label}</label>
        </div>
      ))}
    </div>
  )
})

export default Checkbox
