import classNames from 'classnames'
import { forwardRef, useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { AuthContext } from '@/context'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  listOptionWithAPI?: {
    url: string
    nameKey: string
    valueKey: string
    labelKey: string
  }
  listOption?: ListOption[]
  onChange?: (value: (string | number)[] | null) => void
}

interface ListOption {
  label: string
  value: string | number
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { listOption, listOptionWithAPI, className, onChange, ...rest } = props
  const axiosInstance = useContext(AuthContext)

  const [value, setValue] = useState<(string | number)[]>()
  const [optionsFromAPI, setOptionFromAPI] = useState<ListOption[]>()

  useEffect(() => {
    if (value) {
      if (value.length === 0) {
        onChange?.(null)
      }
      onChange?.(value)
    }
  }, [value])

  const getData = useCallback(async () => {
    if (listOptionWithAPI) {
      const { labelKey, nameKey, url, valueKey } = listOptionWithAPI
      const { status, data } = await axiosInstance.get(url)
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
                if (e.target.checked) {
                  if (prev) {
                    return [...prev, option.value]
                  }
                  return [option.value]
                } else {
                  return prev?.filter((value) => value !== option.value)
                }
              })
            }
            {...rest}
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  )
})

export default Checkbox
