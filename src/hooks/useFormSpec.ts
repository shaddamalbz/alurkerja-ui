import { useState, useEffect } from 'react'
import getTableSpec from '@/api/getTableSpec'
import { FieldProperties, HeaderAction, FieldActionProperties } from '@/types'
import { IGNORE_KEYS } from '@/utils/constant'

interface UseFormSpec {
  baseUrl: string
  tableName: string
}

const useFormSpec = (props: UseFormSpec) => {
  const { baseUrl, tableName } = props
  const { tableSpec, loading } = getTableSpec(baseUrl, tableName)

  const [fieldList, setFieldList] = useState<[string, FieldProperties][]>([])
  const [createSpec, setCreateSpec] = useState<HeaderAction>()
  const [editSpec, setEditSpec] = useState<FieldActionProperties>()

  const getSpec = () => {
    tableSpec?.header_action.forEach((action: HeaderAction) => {
      if (action.label === 'Tambah') {
        setCreateSpec(action)
      } else if (action.label === 'Edit') {
        setEditSpec(action)
      }
    })
    tableSpec?.field_action.forEach((action: FieldActionProperties) => {
      if (action.label === 'Edit') {
        setEditSpec(action)
      }
    })
  }

  useEffect(() => {
    if (tableSpec) {
      getSpec()
      setFieldList(
        Object.entries(tableSpec?.fields).filter(
          (field: [string, FieldProperties]) => IGNORE_KEYS.indexOf(field[0]) === -1
        )
      )
    }
  }, [tableSpec])

  return { fieldList, createSpec, editSpec, loading }
}

export default useFormSpec
