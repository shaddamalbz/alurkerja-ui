import { FC } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { TableHeaderProps } from '@/types'

// components
import Button from '@/components/ui/Button'
import { Dropdown } from '@/components/ui'
import HeaderRight from './HeaderRight'

const TableHeader: FC<TableHeaderProps> = ({
  title,
  tableName,
  setSearch,
  tableSpec,
  onClickCreate,
  module,
  baseUrl,
  setRenderState,
  filter,
  setFilter,
  fieldList,
  extraButton,
  customField,
  textSubmitButton,
  customFilterField,
  message,
  canFilter,
  formConfig,
}) => {
  const ActionProps = {
    baseUrl,
    fieldList,
    tableName,
    customField,
    customFilterField,
    extraButton,
    module,
    filter,
    message,
    setFilter,
    setRenderState,
    setSearch,
    tableSpec,
    textSubmitButton,
    title,
    onClickCreate,
    canFilter,
    formConfig,
  }

  return (
    <div className="flex flex-row items-center justify-between px-4 py-4 border-b gap-2">
      <h5 className="font-bold uppercase mr-4 mb-0">{title || tableName}</h5>
      <div className="hidden lg:flex flex-row gap-2">
        <HeaderRight {...ActionProps} />
        {extraButton && extraButton()}
      </div>
      <div className="inline-block lg:hidden">
        <Dropdown
          triggerElement={<Button className="p-2" icon={<HiOutlineMenu />} />}
          content={<HeaderRight {...ActionProps} />}
        />
      </div>
    </div>
  )
}

export default TableHeader
