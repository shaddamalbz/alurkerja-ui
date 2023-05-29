import { Dispatch, FC, SetStateAction, useState, Fragment } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Modal, Badge, Button } from '@/components/ui'
import { TableSpec, HeaderAction, FieldProperties, FormConfig } from '@/types'
import FormLowcode from '@/features/Crud/Form/FormLowcode'
import { useForm, FieldValues, UseFormSetValue } from 'react-hook-form'
import { FilterIcon } from '@/assets/icons'
import InputTypes from '../../InputTypes'

interface HeaderRightProps {
  setSearch?: Dispatch<SetStateAction<string | undefined>>
  tableSpec?: TableSpec
  extraButton?: () => JSX.Element | null
  onClickCreate?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  baseUrl: string
  tableName: string
  module?: string
  title?: string
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
  setRenderState?: Dispatch<SetStateAction<number>>
  message?: {
    success_create_title?: string
    success_create_text?: string
    success_edit_title?: string
    success_edit_text?: string
    success_delete_title?: string
    success_delete_text?: string
  }
  textSubmitButton?: string
  filter?: { [x: string]: any }
  setFilter?: Dispatch<SetStateAction<{ [x: string]: any } | undefined>>

  customFilterField?: ({
    field,
    setValue,
    defaultField,
  }: {
    field: [string, FieldProperties]
    setValue: UseFormSetValue<FieldValues>
    defaultField: JSX.Element
  }) => JSX.Element
  fieldList: [string, FieldProperties][]
  canFilter?: boolean
  formConfig?: FormConfig
}

const HeaderRight: FC<HeaderRightProps> = ({
  setSearch,
  tableSpec,
  onClickCreate,
  extraButton,
  baseUrl,
  tableName,
  module,
  title,
  customField,
  setRenderState,
  message,
  textSubmitButton,
  filter,
  customFilterField,
  fieldList,
  setFilter,
  canFilter = true,
  formConfig = { hideButtonCancel: false },
}) => {
  const { handleSubmit, setValue, formState, control, reset, watch } = useForm()

  const [tempSearch, setTempSearch] = useState<string>('')

  const handleFilter = (data: FieldValues, close: () => void) => {
    setFilter && setFilter(data)
    close()
  }

  const renderFormFilter = (close: () => void) => (
    <div className="space-y-4">
      {fieldList.map((field: [string, FieldProperties], idx: number) => {
        const [key, spec] = field

        if (spec.filterable) {
          return (
            <div key={idx}>
              <label htmlFor={key}>{spec.label}</label>
              {customFilterField ? (
                customFilterField({
                  field,
                  setValue,
                  defaultField: (
                    <InputTypes
                      baseUrl={baseUrl}
                      fieldSpec={spec}
                      name={spec.name}
                      setValue={setValue}
                      defaultValue={watch(key)}
                    />
                  ),
                })
              ) : (
                <InputTypes
                  baseUrl={baseUrl}
                  fieldSpec={spec}
                  name={spec.name}
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

  return (
    <>
      <div className="flex flex-row rounded border as-2 border-gray-100 shadow-sm w-full lg:w-[300px] justify-self-end">
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
            {tableSpec.can_create && (
              <>
                {actionSpec.label === 'Tambah' && !onClickCreate ? (
                  <Modal title={actionSpec.action_label} triggerButton={<ButtonCreate />}>
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
                        onCancel={() => closeModal()}
                        customField={customField}
                        textSubmitButton={textSubmitButton}
                        hideTitle
                        message={message}
                        hideSecondary={formConfig.hideButtonCancel}
                      />
                    )}
                  </Modal>
                ) : (
                  <ButtonCreate />
                )}
              </>
            )}
          </Fragment>
        )
      })}
      {canFilter && (
        <Modal
          title="Filter"
          triggerButton={
            <button id="button-filter" className="bg-[#F1FAFF] p-2 rounded" style={{ backgroundColor: '#F1FAFF' }}>
              <FilterIcon />
            </button>
          }
        >
          {({ closeModal }) => renderFormFilter(closeModal)}
        </Modal>
      )}

      {extraButton && extraButton()}
    </>
  )
}

export default HeaderRight
