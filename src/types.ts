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
  can_detail: boolean
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
    options: { key: string; label: string }[]
  }
  table_value_mapping?: {
    name: string
    relation: string
    type: string
    value: string
  }
  custom_field_atribute?: {
    type: string
    name: string
    is_multiple: boolean
    allowed_extension: string[]
    service: string
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
  /** base API url (lowcode spec) */
  baseUrl: string
  /**  table name, will be added in base url for fetching spec & data */
  tableName: string
  module?: string
  tableSpec: TableSpec | undefined
  tableData: { id: number; [x: string]: any }[] | undefined
  pagination: PaginationLowcode | undefined
  selectedAll: boolean
  setSelectedAll: Dispatch<SetStateAction<boolean>>
  selectedId?: number[]
  setSelectedId?: Dispatch<SetStateAction<number[]>>
  /**  setter state for refeching data*/
  setRenderState?: Dispatch<SetStateAction<number>>
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
  /**  will be trigger when button edit clicked*/
  onClickEdit?: (fieldSpec: FieldActionProperties, id: number) => void
  onClickDetail?: (id: number) => void
  onClickDelete?: (fieldSpec: FieldActionProperties, id: number) => void
  onDeleteConfirm?: (id: number) => void
  customField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
    value: string | number | boolean
  }) => JSX.Element
  textSubmitButton?: string
  supportBulk?: boolean
  labelAction?: string
  message?: {
    success_create_title?: string
    success_create_text?: string
    success_edit_title?: string
    success_edit_text?: string
    success_delete_title?: string
    success_delete_text?: string
  }
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
  /** trying to custom title instead using tableName? use this */
  title?: string
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
  setSearch?: Dispatch<SetStateAction<string | undefined>>
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
  /**  will be trigger when button delete clicked*/
  onClickDelete?: (fieldSpec: FieldActionProperties, id: number) => void
  /**  will be trigger when button detail clicked*/
  onClickDetail?: (id: number) => void
  onDeleteConfirm?: (id: number) => void
  /** trying to custom header table? use this*/
  headerElement?: JSX.Element
  customField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
    value: string | number | boolean
  }) => JSX.Element
  textSubmitButton?: string
  customFilterField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
  }) => JSX.Element
  /** Custom text column Aksi */
  labelAction?: string
  message?: {
    success_create_title?: string
    success_create_text?: string
    success_edit_title?: string
    success_edit_text?: string
    success_delete_title?: string
    success_delete_text?: string
  }
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
    value: string | number | boolean
  }) => JSX.Element
  /**  handler success action*/
  onSuccess?: () => void
  /**  handler error action*/
  onError?: (err: any) => void
  /**  handler cancel  action*/
  onCancel?: () => void
  /** id for detail / edit form  */
  id?: number
  /** to disabled form */
  disabled?: boolean
  textSubmitButton?: string
  asDetail?: boolean
  title?: string
  message?: {
    success_create_title?: string
    success_create_text?: string
    success_edit_title?: string
    success_edit_text?: string
    [x: string]: any
  }
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

export interface MenuConfig {
  href: string
  label: string
  icon?: JSX.Element
  child?: MenuConfig[]
  groupBy?: string
}

export interface TableLayoutProps {
  /** trying to custom title instead using tableName? use this */
  title?: string
  /** base API url (lowcode spec) */
  baseUrl: string
  /**  table name, will be added in base url for fetching spec & data */
  tableName: string
  module?: string
  /**  setter state for refeching data*/
  setRenderState?: Dispatch<SetStateAction<number>>
  /**  state to store filter data*/
  filterBy?: { [x: string]: any }
  /**  setter for set filter data*/
  setFilterBy?: Dispatch<SetStateAction<{ [x: string]: any } | undefined>>
  /**  state for store current searching data*/
  search?: string
  /**  setter for set current searching data*/
  setSearch?: Dispatch<SetStateAction<string | undefined>>
  /**  state to store page config*/
  pageConfig?: { limit: number; page: number }
  /**  setter to set page config*/
  setPageConfig?: Dispatch<SetStateAction<{ limit: number; page: number }>>

  /**  will be trigger when create button clicked*/
  onClickCreate?: () => void
  /** trying to custom header table? use this*/
  headerElement?: JSX.Element
  customField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
    value: string | number | boolean
  }) => JSX.Element
  textSubmitButton?: string
  children: React.ReactNode
  tableSpec: TableSpec | undefined
  pagination: PaginationLowcode | undefined
  extraButton?: () => JSX.Element | null
  customFilterField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
  }) => JSX.Element
  message?: {
    success_create_title?: string
    success_create_text?: string
    success_edit_title?: string
    success_edit_text?: string
    success_delete_title?: string
    success_delete_text?: string
  }
}

export interface TableHeaderProps {
  title?: string
  baseUrl: string
  tableName: string
  module?: string
  tableSpec: TableSpec | undefined
  filter?: { [x: string]: any }
  setFilter?: Dispatch<SetStateAction<{ [x: string]: any } | undefined>>
  setSearch?: Dispatch<SetStateAction<string | undefined>>
  onClickCreate?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  setRenderState?: Dispatch<SetStateAction<number>>
  fieldList: [string, FieldProperties][]
  extraButton?: () => JSX.Element | null
  customField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
    value: string | number | boolean
  }) => JSX.Element
  textSubmitButton?: string
  customFilterField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
  }) => JSX.Element
  message?: {
    success_create_title?: string
    success_create_text?: string
    success_edit_title?: string
    success_edit_text?: string
    success_delete_title?: string
    success_delete_text?: string
  }
}

export interface SelectBoolean {
  options: any[]
  /** callback to get value */
  onChange?: (value: boolean | undefined) => void
  /** props to set defaultvalue */
  defaultValue?: boolean
}

export interface File {
  collection_name: string
  conversions_disk: string
  created_at: string
  custom_properties: any[]
  disk: string
  file_name: string
  generated_conversions: any[]
  id: number
  manipulations: any[]
  mime_type: string
  model_id: string
  model_type: string
  name: string
  order_column: string
  original_url: string
  preview_url: string
  responsive_images: any[]
  size: string
  updated_at: string
  uuid: string
}
