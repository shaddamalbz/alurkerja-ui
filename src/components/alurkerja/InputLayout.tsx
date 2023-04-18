import { Control, Controller, FieldValues, FormState } from 'react-hook-form'

interface InputLayout {
  formState: FormState<FieldValues>
  children: JSX.Element
  name: string
  label: string
  rules: string[]
  control: Control
}

interface Rules {
  required?: boolean
  maxLength?: number
}

const InputLayout = (props: InputLayout) => {
  const {
    children,
    formState: { errors },
    name,
    label,
    rules,
    control,
  } = props

  const isRequired = rules.includes('required')

  const parseRules = (listRule: string[]) => {
    const obj: Rules = {}

    for (const rule of listRule) {
      if (rules.includes('required')) {
        obj.required = true
      }
      if (rules.includes('nullable')) {
        obj.required = false
      }
      if (rules.includes('max')) {
        // eg ('max:255') => 255
        const value = parseInt(rule.split(':')[1])
        obj.maxLength = value
      }
    }
    return obj
  }

  return (
    <div>
      <div className="mb-1">
        <label htmlFor={name}>
          {label}
          {isRequired && <span className="text-red-400 text-sm">*</span>}
        </label>
      </div>
      <Controller name={name} control={control} rules={parseRules(rules)} render={() => children} />
      <div className="text-red-400 text-xs h-4 mb-2">
        {errors[name] && (
          <>
            {errors[name]?.type === 'required' && <span role="alert">{name} is required</span>}
            {errors[name]?.type === 'pattern' && <span role="alert">patterns dont match</span>}
            {errors[name]?.type === 'maxLength' && <span role="alert">max length exceeded</span>}
            {errors[name]?.type === 'max' && <span role="alert">max exceeded</span>}
          </>
        )}
      </div>
    </div>
  )
}

export default InputLayout
