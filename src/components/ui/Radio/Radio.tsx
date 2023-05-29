import { FC, useState, useEffect, useMemo } from 'react'

interface RadioProps {
  listOptionWithAPI?: {
    url: string
    nameKey: string
    valueKey: string
    labelKey: string
  }
  listOption?: ListOption[]
  onChange?: (value?: string | number) => void
  name: string
  defaultValue?: string | number
}

interface ListOption {
  label: string
  key: string | number
}

const Radio: FC<RadioProps> = (props) => {
  const { listOption, name, onChange, defaultValue } = props

  const [value, setValue] = useState<string | number>()

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    onChange?.(value)
  }, [value])

  return (
    <fieldset className="flex items-center gap-x-2">
      {listOption?.map((option, idx) => (
        <div key={idx}>
          <input
            key={idx}
            className="mr-2"
            type="radio"
            name={name}
            value={option.key}
            onChange={(e) => setValue(e.target.value)}
            defaultChecked={value === option.key}
          />

          <label htmlFor={name}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  )
}

export default Radio
