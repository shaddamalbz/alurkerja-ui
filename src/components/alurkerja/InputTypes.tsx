import { useContext, useState, useEffect } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import axios from 'axios'

import { FieldProperties } from '@/types'
import { Input, Select } from '@/components/ui'

interface InputTypes {
  baseUrl: string
  name: string
  fieldSpec: FieldProperties
  setValue: UseFormSetValue<FieldValues>
  defaultValue?: any
  disabled?: boolean
}

interface SelectedOption {
  label: string
  value: string
}

const InputTypes = (props: InputTypes) => {
  const { fieldSpec, name, setValue, defaultValue, disabled, baseUrl } = props

  const [listOption, setListOption] = useState<SelectedOption[]>()
  const [selectedOption, setSelectedOption] = useState<SelectedOption>()

  const getListOption = async () => {
    if (fieldSpec.select_options) {
      const { method, option_key, option_label, url } = fieldSpec.select_options
      const { data, status } = await axios({
        url: baseUrl + url,
        method: method,
      })
      if (status === 200) {
        const list = data.data.content
        const parsedList = list.map((item: any) => ({
          label: item[option_label],
          value: item[option_key],
        }))
        setListOption(parsedList)
      }
    }
  }

  useEffect(() => {
    if (fieldSpec.form_field_type === 'INPUT_FOREIGN-SELECT') {
      getListOption()
    }
  }, [fieldSpec.form_field_type])

  useEffect(() => {
    if (listOption) {
      setSelectedOption(listOption.filter((option) => option.value === defaultValue)[0])
    }
  }, [listOption, defaultValue])

  useEffect(() => {
    setValue(name, defaultValue)
  }, [defaultValue])

  return (
    <>
      {(fieldSpec.form_field_type === 'INPUT_TEXT' ||
        fieldSpec.form_field_type === 'INPUT_NUMBER' ||
        fieldSpec.form_field_type === 'INPUT_DATETIME-LOCAL') && (
        <Input
          placeholder={name}
          type={fieldSpec.type}
          onChange={(e) => setValue(name, e.target.value)}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      )}
      {fieldSpec.form_field_type === 'INPUT_TEXTAREA' && (
        <Input
          textArea
          placeholder={name}
          type={fieldSpec.type}
          onChange={(e) => setValue(name, e.target.value)}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      )}
      {fieldSpec.form_field_type === 'INPUT_FOREIGN-SELECT' && (
        <Select
          options={listOption}
          onChange={(selected: any) => setValue(name, selected.value)}
          value={selectedOption}
          isDisabled={disabled}
        />
      )}
    </>
  )
}

export default InputTypes
