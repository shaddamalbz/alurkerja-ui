import { useState, useEffect, FC } from 'react'
import { useForm } from 'react-hook-form'
import { FieldProperties, TableLayoutProps } from '@/types'

// components
import Pagination from '@/components/Pagination'
import TableHeader from './TableHeader'

const TableLayout: FC<TableLayoutProps> = ({
  title,
  baseUrl,
  tableName,
  module,
  children,
  tableSpec,
  filterBy,
  setFilterBy,
  setSearch,
  pagination,
  pageConfig,
  setPageConfig,
  extraButton,
  onClickCreate,
  setRenderState,
  headerElement,
  customField,
  textSubmitButton,
  customFilterField,
  message,
}) => {
  const { setValue } = useForm()

  const fields = tableSpec?.fields

  const [fieldList, setFieldList] = useState<[string, FieldProperties][]>([])

  useEffect(() => {
    if (fields) {
      setFieldList(Object.entries(fields))
    }
  }, [fields])

  useEffect(() => {
    if (filterBy) {
      const listFilter = Object.entries(filterBy)
      listFilter.forEach(([key, value]) => {
        setValue(key, value)
      })
    }
  }, [filterBy])

  return (
    <div className="bg-white rounded">
      {headerElement ? (
        headerElement
      ) : (
        <TableHeader
          title={title}
          baseUrl={baseUrl}
          tableName={tableName}
          tableSpec={tableSpec}
          fieldList={fieldList}
          filter={filterBy}
          setSearch={setSearch}
          extraButton={extraButton}
          module={module}
          onClickCreate={onClickCreate}
          setFilter={setFilterBy}
          setRenderState={setRenderState}
          customField={customField}
          textSubmitButton={textSubmitButton}
          customFilterField={customFilterField}
          message={message}
        />
      )}
      {children}
      {pageConfig && setPageConfig && (
        <Pagination pagination={pagination} setPageConfig={setPageConfig} pageConfig={pageConfig} />
      )}
    </div>
  )
}

export default TableLayout
