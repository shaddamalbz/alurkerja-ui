import React, { ReactNode, useMemo, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import _ from 'underscore'

import '@/assets/scss/input.scss'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  asElement?: React.ElementType
  disabled?: boolean
  invalid?: boolean
  textArea?: boolean
  prefix?: string | ReactNode
  suffix?: string | ReactNode
  unstyle?: boolean
  form?: any
  field?: any
  size?: 'xs' | 'md' | 'md' | 'lg'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    asElement: Component = 'input',
    className,
    disabled,
    invalid,
    prefix,
    size,
    suffix,
    type,
    style,
    unstyle,
    field,
    form,
    textArea,
    ...rest
  } = props

  const [prefixGutter, setPrefixGutter] = useState(0)
  const [suffixGutter, setSuffixGutter] = useState(0)

  const fixControlledValue = (val: any) => {
    if (typeof val === 'undefined' || val === null) {
      return ''
    }
    return val
  }

  if ('value' in props) {
    rest.value = fixControlledValue(props.value)
    delete rest.defaultValue
  }

  const isInvalid = useMemo(() => {
    let validate: boolean | undefined = false
    if (!_.isEmpty(form)) {
      const { touched, errors } = form
      const touchedField = _.get(touched, field.name)
      const errorField = _.get(errors, field.name)
      validate = touchedField && errorField
    }
    if (typeof invalid === 'boolean') {
      validate = invalid
    }
    return validate
  }, [form, invalid, field])

  const inputDefaultClass = 'input'
  const inputSizeClass = 'h-11'
  const inputFocusClass =
    'focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600} focus:border-indigo-600'
  const inputWrapperClass = `input-wrapper ${prefix || suffix ? className : ''}`
  const inputClass = classNames(
    inputDefaultClass,
    !textArea && inputSizeClass,
    !isInvalid && inputFocusClass,
    !prefix && !suffix ? className : '',
    disabled && 'input-disabled',
    isInvalid && 'input-invalid',
    textArea && 'input-textarea'
  )

  const prefixNode = useRef<any>()
  const suffixNode = useRef<any>()

  const getAffixSize = () => {
    if (!prefixNode.current && !suffixNode.current) {
      return
    }
    const prefixNodeWidth = prefixNode?.current?.offsetWidth
    const suffixNodeWidth = suffixNode?.current?.offsetWidth

    if (
      _.isNull(prefixNodeWidth) &&
      _.isUndefined(prefixNodeWidth) &&
      _.isNull(suffixNodeWidth) &&
      _.isUndefined(suffixNodeWidth)
    ) {
      return
    }

    if (prefixNodeWidth) {
      setPrefixGutter(prefixNodeWidth)
    }

    if (suffixNodeWidth) {
      setSuffixGutter(suffixNodeWidth)
    }
  }

  useEffect(() => {
    getAffixSize()
  }, [prefix, suffix])

  const remToPxConvertion = (pixel: number) => 0.0625 * pixel

  const affixGutterStyle = () => {
    const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`
    const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`
    let gutterStyle: { paddingLeft?: string; paddingRight?: string } = {}

    if (prefix) {
      gutterStyle.paddingLeft = leftGutter
    }

    if (suffix) {
      gutterStyle.paddingRight = rightGutter
    }

    return gutterStyle
  }

  const inputProps = {
    className: !unstyle ? inputClass : '',
    disabled,
    type,
    ref,
    ...field,
    ...rest,
  }

  const renderTextArea = <textarea style={style} {...inputProps}></textarea>

  const renderInput = <Component style={{ ...affixGutterStyle(), ...style }} {...inputProps} />

  const renderAffixInput = (
    <span className={inputWrapperClass}>
      {prefix ? (
        <div className="input-suffix-start" ref={(node) => (prefixNode.current = node)}>
          {' '}
          {prefix}{' '}
        </div>
      ) : null}
      {renderInput}
      {suffix ? (
        <div className="input-suffix-end" ref={(node) => (suffixNode.current = node)}>
          {suffix}
        </div>
      ) : null}
    </span>
  )

  const renderChildren = () => {
    if (textArea) {
      return renderTextArea
    }

    if (prefix || suffix) {
      return renderAffixInput
    } else {
      return renderInput
    }
  }

  return renderChildren()
})

Input.defaultProps = {
  type: 'text',
  className: '',
  unstyle: false,
}

export default Input
