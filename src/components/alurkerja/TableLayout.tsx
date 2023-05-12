import { useState, useEffect, Dispatch, SetStateAction, FC } from 'react'
import { useForm } from 'react-hook-form'
import { TableSpec, FieldProperties, PaginationLowcode } from '@/types'

// components
import Pagination from '@/components/Pagination'
import TableHeader from './TableHeader'

interface TableLayoutProps {
  title?: string
  baseUrl: string
  tableName: string
  module?: string
  children: React.ReactNode
  tableSpec: TableSpec | undefined
  filter?: { [x: string]: any }
  setFilter?: Dispatch<SetStateAction<{ [x: string]: any } | undefined>>
  search?: string
  setSearch?: Dispatch<SetStateAction<string | undefined>>
  pagination: PaginationLowcode | undefined
  pageConfig?: {
    page: number
    limit: number
  }
  setPageConfig?: Dispatch<SetStateAction<{ page: number; limit: number }>>
  extraButton?: () => JSX.Element | null
  onClickCreate?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  setRenderState?: Dispatch<SetStateAction<number>>
  headerElement?: JSX.Element
}

const TableLayout: FC<TableLayoutProps> = ({
  title,
  baseUrl,
  tableName,
  module,
  children,
  tableSpec,
  filter,
  setFilter,
  setSearch,
  pagination,
  pageConfig,
  setPageConfig,
  extraButton,
  onClickCreate,
  setRenderState,
  headerElement,
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
    if (filter) {
      const listFilter = Object.entries(filter)
      listFilter.forEach(([key, value]) => {
        setValue(key, value)
      })
    }
  }, [filter])

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
          filter={filter}
          setSearch={setSearch}
          extraButton={extraButton}
          module={module}
          onClickCreate={onClickCreate}
          setFilter={setFilter}
          setRenderState={setRenderState}
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
