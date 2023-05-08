import { Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormHandleSubmit, Control, FormState, UseFormSetValue } from 'react-hook-form'

export interface AppSpec {
  name: string
  description: string
  tables: TableSpec[]
}

export interface TableSpec {
  show_as_menu: boolean
  name: string
  can_bulk: boolean
  can_create: boolean
  can_delete: boolean
  can_edit: boolean
  label: string
  description: string
  header_action: HeaderAction[]
  field_action: FieldActionProperties[]
  fields: {
    [x: string]: FieldProperties
  }
}

export interface HeaderAction {
  label: string
  action_label: string
  method: string
  form_type: string
  path: string
  icon: string
  type: string
}

export interface FieldActionProperties {
  label: string
  action_label: string
  method: string
  form_type: string
  confirm?: {
    title: string
    message: string
    confirm_text: string
    cancel_text: string
  }
  path: string
  icon: string
  type: string
}

export interface FieldProperties {
  name: string
  label: string
  required: boolean
  searchable: boolean
  filterable: boolean
  sortable: boolean
  type: string
  form_field_type: string
  primary: boolean
  is_hidden_in_create: boolean
  is_hidden_in_edit: boolean
  is_hidden_in_list: boolean
  rules: string[]
  format: string
  prefix: string
  suffix: string
  select_options?: {
    method: string
    option_key: string
    option_label: string
    url: string
  }
}

export interface PaginationLowcode {
  empty: boolean
  first: boolean
  last: boolean
  number: number
  number_of_element: number
  pageable: {
    offset: number
    unpaged: false
    paged: boolean
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  total_elements: number
  total_page: number
}

export interface TableLowcodeProps {
  baseUrl: string
  tableName: string
  tableSpec: TableSpec | undefined
  tableData: { id: number; [x: string]: any }[] | undefined
  pagination: PaginationLowcode | undefined
  setRenderState?: Dispatch<SetStateAction<number>>
  selectedAll: boolean
  setSelectedAll: Dispatch<SetStateAction<boolean>>
  selectedId?: number[]
  setSelectedId?: Dispatch<SetStateAction<number[]>>
  customCell?: ({
    name,
    fields,
    value,
    defaultCell,
  }: {
    name: string
    fields: { [x: string]: FieldProperties }
    value: any
    defaultCell: JSX.Element
  }) => JSX.Element
  onClickEdit?: (fieldSpec: FieldActionProperties, id: number) => void
}

export interface PaginationProps {
  pagination?: any | undefined
  pageConfig?: {
    limit: number
    page: number
  }
  setPageConfig?: Dispatch<
    SetStateAction<{
      limit: number
      page: number
    }>
  >
}

export interface IAlurkerjaTableLowcode {
  /** base API url (lowcode spec) */
  baseUrl: string
  /**  table name, will be added in base url for fetching spec & data */
  tableName: string
  module?: string
  /**  state for refetching data*/
  renderState?: number
  /**  setter state for refeching data*/
  setRenderState?: Dispatch<SetStateAction<number>>
  /**  state to store filter data*/
  filterBy?: { [x: string]: any }
  /**  setter for set filter data*/
  setFilterBy?: Dispatch<SetStateAction<{ [x: string]: any } | undefined>>
  /**  state for store current searching data*/
  search?: string
  /**  setter for set current searching data*/
  setSearch?: Dispatch<SetStateAction<string>>
  /**  state to store page config*/
  pageConfig?: { limit: number; page: number }
  /**  setter to set page config*/
  setPageConfig?: Dispatch<SetStateAction<{ limit: number; page: number }>>
  /**  state to store selected row*/
  selectedRow?: number[]
  /**  setter to set selected row*/
  setSelectedRow?: Dispatch<SetStateAction<number[]>>
  /**  render custom cell table base for ex custom by fields.name*/
  customCell?: ({
    name,
    fields,
    value,
    defaultCell,
  }: {
    name: string
    fields: { [x: string]: FieldProperties }
    value: any
    defaultCell: JSX.Element
  }) => JSX.Element
  /**  will be trigger when create button clicked*/
  onClickCreate?: () => void
  /**  will be trigger when button edit clicked*/
  onClickEdit?: (fieldSpec: FieldActionProperties, id: number) => void
}

export interface IAlurkerjaFormLowcode {
  /**  base API url (lowcode spec)*/
  baseUrl: string
  /**  table name, will be added in base url for fetching spec & data*/
  tableName: string
  /** to customize /crud on endpoint  */
  module?: string
  /**  handleSubmit from  react-hook-form*/
  handleSubmit: UseFormHandleSubmit<FieldValues>
  onSubmit?: (form: FieldValues) => void
  /**  control from  react-hook-form*/
  control: Control
  /**  formState from  react-hook-form*/
  formState: FormState<FieldValues>
  /**  setValue from  react-hook-form*/
  setValue: UseFormSetValue<FieldValues>
  /**  render custom field form base for ex custom by fieldSpec.name*/
  customField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
  }) => JSX.Element
  /**  handler success action*/
  onSuccess?: () => void
  /**  handler error action*/
  onError?: (err: any) => void
  /** id for detail / edit form  */
  id?: number
  /** to disabled form */
  disabled?: boolean
}

/**
 * refer to laravolt spesification for non lowcode
 */
export type ListSpec = Spec[]

export interface Spec {
  name: string
  label?: string
  required?: boolean
  type: string
  constraints?: any[]
  metadata?: {
    format?: string
    canSort?: boolean
    placeholder?: string
    canFilter?: boolean
    tooltips?: string
  }
}

export interface TableProps {
  listSpec: ListSpec
  tableData: { [x: string]: any }[] | undefined
  Pagination: Pagination | undefined
  showColumnNumber?: boolean
  showColumnAction?: boolean
  showColumnBatch?: boolean
  pageConfig?: { limit: number; page: number }
}

export interface IALurkerjaTable {
  spec: ListSpec
  url: string
  /**  state to store page config*/
  pageConfig?: { limit: number; page: number }
  setPageConfig?: Dispatch<SetStateAction<{ limit: number; page: number }>>
}

export interface Pagination {
  pageable: Pageable
  totalPages: number
  totalElements: number
  numberOfElements: number
  first: boolean
  last: boolean
  size: number
  number: number
  empty: boolean
  sort: Sort
}

export interface Pageable {
  sort: Sort
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface IAlurkerjaForm {
  title?: string
  description?: string
  listSpec: ListSpec
  inline?: boolean
  disable?: boolean
  withStatus?: boolean
}
