import { Dispatch, SetStateAction } from 'react'

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

export interface PaginationProperties {
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

export interface TableProps {
  baseUrl: string
  tableSpec: TableSpec | undefined
  tableData: { id: number; [x: string]: any }[] | undefined
  pagination: PaginationProperties | undefined
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
  onEditClick?: (fieldSpec: FieldActionProperties, id: number) => void
}

export interface PaginationProps {
  pagination: PaginationProperties | undefined
  pageConfig: {
    limit: number
    page: number
  }
  setPageConfig: Function
}
