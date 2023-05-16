import { useContext, useState, useEffect } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import axios from 'axios'

import { FieldProperties } from '@/types'
import { Input, Select } from '@/components/ui'
import moment from 'moment'

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
  value: string | number
}

const InputTypes = (props: InputTypes) => {
  const { fieldSpec, name, setValue, defaultValue, disabled, baseUrl } = props

  const [listOption, setListOption] = useState<SelectedOption[]>()
  const [selectedOption, setSelectedOption] = useState<SelectedOption>()

  const [loadingOptions, setLoadingOptions] = useState(false)

  const getListOption = async (signal: AbortSignal) => {
    if (fieldSpec.select_options) {
      const { method, option_key, option_label, url } = fieldSpec.select_options
      setLoadingOptions(true)
      const { data, status } = await axios({
        url: baseUrl + url,
        method: method,
        signal,
      })
      if (status === 200) {
        const list = data.data.content
        const parsedList = list.map((item: any) => ({
          label: item[option_label],
          value: item[option_key],
        }))
        setListOption(parsedList)
      }
      setLoadingOptions(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (fieldSpec.form_field_type === 'INPUT_FOREIGN-SELECT') {
      const signal = abortController.signal
      getListOption(signal)
    }
    return () => {
      abortController.abort()
    }
  }, [fieldSpec.form_field_type])

  useEffect(() => {
    if (listOption) {
      setSelectedOption(listOption.filter((option) => +option.value === +defaultValue)[0])
    }
  }, [listOption, defaultValue])

  useEffect(() => {
    setValue(name, defaultValue)
  }, [defaultValue])

  return (
    <>
      {(fieldSpec.form_field_type === 'INPUT_TEXT' ||
        fieldSpec.form_field_type === 'INPUT_NUMBER' ||
        fieldSpec.form_field_type === 'INPUT_DATETIME-LOCAL' ||
        fieldSpec.form_field_type === 'INPUT_TEXTAREA' ||
        fieldSpec.form_field_type === 'INPUT_DATE') && (
        <Input
          placeholder={name}
          type={fieldSpec.type}
          onChange={(e) => setValue(name, e.target.value)}
          defaultValue={fieldSpec.type === 'date' ? moment(defaultValue).format('YYYY-MM-DD').toString() : defaultValue}
          disabled={disabled}
          textArea={fieldSpec.form_field_type === 'INPUT_TEXTAREA'}
        />
      )}

      {fieldSpec.form_field_type === 'INPUT_FOREIGN-SELECT' && (
        <Select
          isLoading={loadingOptions}
          options={listOption}
          onChange={(selected: any) => setValue(name, selected.value)}
          value={selectedOption}
          isDisabled={disabled || loadingOptions}
        />
      )}
    </>
  )
}

export default InputTypes
