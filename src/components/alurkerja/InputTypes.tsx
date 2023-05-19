import { useContext, useState, useEffect } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

import { FieldProperties } from '@/types'
import { AuthContext } from '@/context'
import { Checkbox, Input, Radio, Select, Switch } from '@/components/ui'
import moment from 'moment'

interface InputTypes {
  baseUrl: string
  name: string
  fieldSpec: FieldProperties
  setValue: UseFormSetValue<FieldValues>
  defaultValue?: any
  disabled?: boolean
  asDetail?: boolean
}

interface SelectedOption {
  label: string
  value: string | number
}

const InputTypes = (props: InputTypes) => {
  const { fieldSpec, name, setValue, defaultValue, disabled, baseUrl, asDetail } = props
  const axiosInstance = useContext(AuthContext)

  const [listOption, setListOption] = useState<SelectedOption[]>()
  const [selectedOption, setSelectedOption] = useState<SelectedOption>()

  const [loadingOptions, setLoadingOptions] = useState(false)

  const getListOption = async (signal: AbortSignal) => {
    if (fieldSpec.select_options) {
      const { method, option_key, option_label, url } = fieldSpec.select_options
      setLoadingOptions(true)
      const { data, status } = await axiosInstance({
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

  if (asDetail) {
    return <div>{defaultValue}</div>
  }

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
          defaultValue={defaultValue && moment(defaultValue).format('YYYY-MM-DD').toString()}
          disabled={disabled}
          textArea={fieldSpec.form_field_type === 'INPUT_TEXTAREA'}
        />
      )}
      {fieldSpec.form_field_type === 'INPUT_RADIO' && (
        <Radio name={name} listOption={fieldSpec.select_options?.options} />
      )}
      {fieldSpec.form_field_type === 'INPUT_CHECKBOX' && <Checkbox name={name} />}
      {fieldSpec.form_field_type === 'INPUT_SWITCH' && (
        <Switch
          options={[
            { label: 'Ya', value: true },
            { label: 'Tidak', value: false },
          ]}
          onChange={(value) => setValue(name, value)}
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
