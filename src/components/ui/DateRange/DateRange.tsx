import { useState, useEffect } from 'react'
import { Input } from '@/components/ui'
import _ from 'underscore'

interface Value {
  from?: string
  to?: string
}

interface DateRangeProps {
  /** value cant be formated using momentjs */
  onChange?: (value: Value | undefined) => void
  text?: string
}

export default function DateRange(props: DateRangeProps) {
  const { onChange, text } = props

  const [value, setValue] = useState<Value>()

  useEffect(() => {
    onChange?.(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setValue((prev) => _.omit(prev, e.target.name))
    } else {
      setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Input name="from" className="w-2/5" type="date" onChange={handleChange} />
      <span>{text || 's/d'}</span>
      <Input name="to" className="w-2/5" type="date" onChange={handleChange} />
    </div>
  )
}
