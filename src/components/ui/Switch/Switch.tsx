import { useState, useEffect } from 'react'
import { SelectBoolean } from '@/types'

const Switch = ({ options, onChange, defaultValue = false }: SelectBoolean) => {
  const [selected, setSelected] = useState<boolean>()

  useEffect(() => {
    onChange?.(selected)
  }, [selected])

  useEffect(() => {
    if (defaultValue === false || defaultValue === true) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  return (
    <>
      <div className="w-full flex items-center">
        {options.map((option, idx: number) => (
          <div
            className={`w-[55px] text-white py-2 flex justify-center cursor-pointer ${
              selected === option.value ? (idx % 2 === 0 ? 'bg-[#005FC2]' : ' bg-[#F4402C]') : 'bg-[#DFDFDF]'
            } ${idx % 2 === 0 ? `rounded-l` : 'rounded-r'}`}
            onClick={() => setSelected(option.value)}
            key={idx}
          >
            {option.label}
          </div>
        ))}
      </div>
    </>
  )
}

export default Switch
