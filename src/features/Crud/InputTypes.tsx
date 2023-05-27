import { useContext, useState, useEffect } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

import { FieldProperties } from '@/types'
import { AuthContext } from '@/context'
import { Checkbox, DirectUpload, Input, Radio, Select, Skeleton, Switch, Wysiwyg } from '@/components/ui'
import moment from 'moment'
import _ from 'underscore'
import { CardFile, CardImage } from '@/components/ui/Card'

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
    setLoadingOptions(true)

    if (fieldSpec.select_options) {
      const { method, option_key, option_label, url, options } = fieldSpec.select_options
      if (options) {
        const parsedList: SelectedOption[] = options.map((opt) => ({ label: opt.label, value: opt.key.toString() }))
        // add 1 ms timeout to fix bug defaultValue on React Select
        setTimeout(() => {
          setListOption(parsedList)
          setSelectedOption(parsedList.filter((option) => option.value === defaultValue)[0])
          setLoadingOptions(false)
        }, 1)
      } else {
        setLoadingOptions(true)
        const { data, status } = await axiosInstance({
          url: baseUrl + url,
          method: method,
          signal,
        })
        if (status === 200) {
          const list = data.data.content
          const parsedList: SelectedOption[] = list.map((item: any) => ({
            label: item[option_label],
            value: item[option_key].toString(),
          }))
          setSelectedOption(parsedList.filter((option) => option.value === defaultValue)[0])
          setListOption(parsedList)
        }
        setLoadingOptions(false)
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (fieldSpec.form_field_type === 'INPUT_FOREIGN-SELECT' || fieldSpec.form_field_type === 'INPUT_SELECT') {
      const signal = abortController.signal
      getListOption(signal)
    }

    return () => {
      abortController.abort()
    }
  }, [fieldSpec.form_field_type])

  useEffect(() => {
    setValue(name, defaultValue)
  }, [defaultValue])

  if (asDetail) {
    if (fieldSpec.form_field_type === 'INPUT_FILE_UPLOAD') {
      return <CardFile data={defaultValue} readonly />
    } else if (fieldSpec.form_field_type === 'INPUT_IMAGE_UPLOAD') {
      return <CardImage data={defaultValue} readonly />
    }
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
          defaultValue={
            defaultValue && fieldSpec.form_field_type === 'INPUT_DATE'
              ? moment(defaultValue).format('YYYY-MM-DD').toString()
              : defaultValue
          }
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
      {(fieldSpec.form_field_type === 'INPUT_FOREIGN-SELECT' || fieldSpec.form_field_type === 'INPUT_SELECT') && (
        <>
          {loadingOptions ? (
            <Skeleton className="h-9" />
          ) : (
            <Select
              options={listOption}
              onChange={(selected: any) => setValue(name, selected.value)}
              defaultValue={selectedOption}
              isDisabled={disabled}
            />
          )}
        </>
      )}

      {(fieldSpec.form_field_type === 'INPUT_IMAGE_UPLOAD' || fieldSpec.form_field_type === 'INPUT_FILE_UPLOAD') &&
        fieldSpec.custom_field_atribute && (
          <DirectUpload
            baseUrl={baseUrl}
            service={fieldSpec.custom_field_atribute.service}
            onSuccess={(file) => setValue(name, file)}
            allowedExtension={fieldSpec.custom_field_atribute.allowed_extension}
            defaultValue={defaultValue}
          />
        )}
      {fieldSpec.form_field_type === 'INPUT_WYSIWYG' && <Wysiwyg onChange={(value) => setValue(name, value)} />}
    </>
  )
}

export default InputTypes
