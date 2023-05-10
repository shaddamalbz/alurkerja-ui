import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import ReactSelect, { Props } from 'react-select'
import _ from 'underscore'
import { HiCheck, HiChevronDown, HiX } from 'react-icons/hi'

// components
import Spinner from '../Spinner'

import '@/assets/scss/select.scss'
import axios from 'axios'
export interface Select extends Props {
  size?: 'sm' | 'md' | 'lg'
  field?: any
  form?: any
  /** API endpoint */
  listOptionSpec?: {
    url: string
    valueKey: string
    labelKey: string
  }
}

interface SelectedOption {
  label: string
  value: string
}

const DefaultOption = ({ innerProps, label, selectProps, isSelected, isDisabled }: any) => {
  const { themeColor } = selectProps
  return (
    <div className={`select-option ${isSelected && 'selected'} ${isDisabled && 'disabled'}`} {...innerProps}>
      <span className="ml-2">{label}</span>
      {isSelected && <HiCheck className={`text-${themeColor} text-xl`} />}
    </div>
  )
}

const DefaultDropdownIndicator = () => {
  return (
    <div className="select-dropdown-indicator">
      <HiChevronDown />
    </div>
  )
}

const DefaultClearIndicator = (props: any) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props
  return (
    <div {...restInnerProps} ref={ref}>
      <div className="select-clear-indicator">
        <HiX />
      </div>
    </div>
  )
}

const DefaultLoadingIndicator = ({ selectProps }: any) => {
  const { themeColor } = selectProps
  return <Spinner className={`select-loading-indicatior text-${themeColor}`} />
}

const Select = React.forwardRef<HTMLDivElement, Select>((props, ref) => {
  const { size, className, form, field, components, listOptionSpec, ...rest } = props

  const [listOption, setListOption] = useState<SelectedOption[]>()

  let isInvalid: boolean | undefined = false

  if (!_.isEmpty(form)) {
    const { touched, errors } = form

    const touchedField = _.get(touched, field.name)
    const errorField = _.get(errors, field.name)

    isInvalid = touchedField && errorField
  }

  const selectClass = classNames('select', className)

  const getListOption = async () => {
    if (listOptionSpec) {
      const { status, data } = await axios({
        url: listOptionSpec.url,
        method: 'GET',
      })

      if (status === 200) {
        const list = data.data.content

        const { labelKey, valueKey } = listOptionSpec

        const parsedList = list.map((item: any) => ({
          label: item[labelKey],
          value: item[valueKey],
        }))
        setListOption(parsedList)
      }
    }
  }

  useEffect(() => {
    getListOption()
  }, [])

  return (
    <ReactSelect
      className={selectClass}
      classNamePrefix={'select'}
      ref={ref}
      components={{
        IndicatorSeparator: () => null,
        Option: DefaultOption,
        LoadingIndicator: DefaultLoadingIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        ClearIndicator: DefaultClearIndicator,
        ...components,
      }}
      options={listOption}
      {...field}
      {...rest}
    />
  )
})

export default Select
