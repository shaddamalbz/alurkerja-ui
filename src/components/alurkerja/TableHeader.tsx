import { Fragment, useState, Dispatch, SetStateAction, FC } from 'react'
import { FieldValues, useForm, UseFormSetValue } from 'react-hook-form'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { HiOutlineMenu } from 'react-icons/hi'

import { HeaderAction, FieldProperties, TableHeaderProps } from '@/types'
import { FilterIcon } from '@/assets/icons'

// components
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'

import FormLowcode from '@/components/alurkerja/Form/FormLowcode'
import InputTypes from './InputTypes'

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
}) => {
  const { handleSubmit, watch, setValue, formState, control, reset } = useForm()

  const [tempSearch, setTempSearch] = useState<string>('')

  const renderFormFilter = (close: () => void) => (
    <div className="space-y-4">
      {fieldList.map((field: [string, FieldProperties], idx: number) => {
        const key = field[0]
        const fieldSpec = field[1]
        if (fieldSpec.filterable) {
          return (
            <div key={idx}>
              <label htmlFor={key}>{fieldSpec.label}</label>
              {customFilterField ? (
                customFilterField({
                  field,
                  setValue,
                  defaultField: (
                    <InputTypes
                      baseUrl={baseUrl}
                      fieldSpec={fieldSpec}
                      name={fieldSpec.name}
                      setValue={setValue}
                      defaultValue={watch(key)}
                    />
                  ),
                })
              ) : (
                <InputTypes
                  baseUrl={baseUrl}
                  fieldSpec={fieldSpec}
                  name={fieldSpec.name}
                  setValue={setValue}
                  defaultValue={watch(key)}
                />
              )}
            </div>
          )
        }
      })}
      <div className="w-full flex gap-4 justify-end">
        <Button
          size="sm"
          onClick={() => {
            setFilter?.(undefined)
            reset()
            close()
          }}
        >
          Clear Filter
        </Button>
        <Button size="sm" onClick={handleSubmit((data) => handleFilter(data, close))}>
          Filter
        </Button>
      </div>
    </div>
  )

  const handleFilter = (data: FieldValues, close: () => void) => {
    setFilter && setFilter(data)
    close()
  }

  return (
    <div className="flex flex-row items-center justify-between px-4 py-4 border-b gap-2">
      <h5 className="font-bold uppercase mr-4 mb-0">{title || tableName}</h5>
      <div className="hidden lg:flex flex-row gap-2">
        <div className="flex flex-row rounded border as-2 border-gray-100 shadow-sm w-[300px] justify-self-end">
          <input
            className="p-1 px-2 w-full border-0 rounded-l bg-gray-100 focus:ring-0"
            type="search"
            id="search"
            name="search"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearch && setSearch(tempSearch)
              }
            }}
          />
          <span className="flex items-center px-2  p-2 bg-gray-100">
            <FaSearch color="#9CA3AF" />
          </span>
        </div>
        <>
          {tableSpec?.header_action.map((actionSpec: HeaderAction, idx: number) => {
            const ButtonCreate = () => (
              <button
                id="button-create"
                className="cursor-pointer bg-blue-400 flex items-center rounded-md py-2 px-4 text-sm text-white gap-2"
                onClick={onClickCreate}
              >
                <FaPlus />
                <span>{actionSpec.action_label}</span>
              </button>
            )
            return (
              <Fragment key={idx}>
                {actionSpec.label === 'Tambah' && tableSpec?.can_create && !onClickCreate ? (
                  <Modal triggerButton={<ButtonCreate />}>
                    {({ closeModal }) => (
                      <FormLowcode
                        module={module}
                        baseUrl={baseUrl}
                        tableName={tableName}
                        formState={formState}
                        handleSubmit={handleSubmit}
                        control={control}
                        setValue={setValue}
                        onSuccess={() => {
                          closeModal()
                          setRenderState?.((prev) => prev + 1)
                        }}
                        customField={customField}
                        textSubmitButton={textSubmitButton}
                      />
                    )}
                  </Modal>
                ) : (
                  <ButtonCreate />
                )}
                <Modal
                  title="Filter"
                  triggerButton={
                    <div>
                      <Badge content={Object.entries(filter || {}).length} maxCount={3}>
                        <button
                          id="button-filter"
                          className="bg-[#F1FAFF] p-2 rounded"
                          style={{ backgroundColor: '#F1FAFF' }}
                        >
                          <FilterIcon />
                        </button>
                      </Badge>
                    </div>
                  }
                >
                  {({ closeModal }) => renderFormFilter(closeModal)}
                </Modal>
              </Fragment>
            )
          })}
          {extraButton && extraButton()}
        </>
      </div>
      <Button className="inline-block lg:hidden p-2" icon={<HiOutlineMenu />} />
    </div>
  )
}

export default TableHeader
