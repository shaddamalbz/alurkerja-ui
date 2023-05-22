import { FC } from 'react'
import classNames from 'classnames'
import ReactSelect, { Props } from 'react-select'
import _ from 'underscore'
import { HiCheck, HiChevronDown, HiX } from 'react-icons/hi'

// components
import Spinner from '../Spinner'

import '@/assets/scss/select.scss'

export interface SelectProps extends Props {
  size?: 'sm' | 'md' | 'lg'
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

const Select: FC<SelectProps> = (props) => {
  const { size, className, components, ...rest } = props

  const selectClass = classNames('select', className)

  return (
    <ReactSelect
      className={selectClass}
      classNamePrefix={'select'}
      components={{
        IndicatorSeparator: () => null,
        Option: DefaultOption,
        LoadingIndicator: DefaultLoadingIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        ClearIndicator: DefaultClearIndicator,
        ...components,
      }}
      {...rest}
    />
  )
}

export default Select
