import { forwardRef, useState } from 'react'

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'> {
  listOptionWithAPI?: {
    url: string
    nameKey: string
    valueKey: string
    labelKey: string
  }
  listOption?: ListOption[]
  onChange?: (value: string | number) => void
  name: string
}

interface ListOption {
  name: string
  label: string
  value: string | number
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { listOption, listOptionWithAPI, name, onChange, ...rest } = props

  return (
    <fieldset className="flex items-center gap-x-2">
      {listOption?.map((option, idx) => (
        <div key={idx}>
          <input
            className="mr-2"
            ref={ref}
            type="radio"
            name={name}
            value={option.value}
            onChange={(e) => onChange?.(e.target.value)}
            {...rest}
          />
          <label htmlFor={option.name}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  )
})

export default Radio
