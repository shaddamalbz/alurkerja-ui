import { Fragment, useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { MdDownload } from 'react-icons/md'
import Swal from 'sweetalert2'
import classNames from 'classnames'
import _ from 'underscore'
import moment from 'moment'
import { TableLowcodeProps, FieldActionProperties, File } from '@/types'

import { getValueByPath } from '@/utils'
import { AuthContext } from '@/context'
import FormLowcode from '@/components/alurkerja/Form/FormLowcode'
import { Avatar, AvatarGroup, Button, Modal } from '@/components/ui'

const TableLowcode = (props: TableLowcodeProps) => {
  const {
    tableName,
    baseUrl,
    module,
    tableSpec,
    tableData,
    pagination,
    setRenderState,
    selectedId,
    setSelectedId,
    selectedAll,
    setSelectedAll,
    customCell,
    onClickEdit,
    customField,
    textSubmitButton,
    onClickDelete,
    onDeleteConfirm,
    onClickDetail,
    labelAction,
    message,
  } = props
  const axiosInstance = useContext(AuthContext)

  const [fieldKeyList, setFieldKeyList] = useState<string[]>()

  const { handleSubmit, setValue, formState, control } = useForm()

  const handleAction = (actionSpec: FieldActionProperties, id: number) => {
    const { label, confirm, path } = actionSpec
    if (label === 'Edit') {
      onClickEdit?.(actionSpec, id)
    } else if (label === 'Hapus' && confirm) {
      if (onClickDelete) {
        onClickDelete(actionSpec, id)
      } else {
        Swal.fire({
          title: confirm.title,
          text: confirm.message,
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: confirm.cancel_text,
          confirmButtonText: confirm.confirm_text,
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (onDeleteConfirm) {
              onDeleteConfirm(id)
            } else {
              const res = await axiosInstance({
                method: actionSpec.method,
                url: baseUrl + path.replace('{id}', id.toString()),
              })
              if (res.status === 200) {
                Swal.fire({
                  icon: 'success',
                  title: message?.success_delete_title || 'Sukses!',
                  text: message?.success_delete_text || 'Data telah berhasil dihapus',
                }).then(() => setRenderState?.((prev) => prev + 1))
              }
            }
          }
        })
      }
    }
  }

  const selectAll = () => {
    if (tableData) {
      const selectedIdList = [...tableData].map((item) => item.id)
      if (!selectedAll) {
        setSelectedAll(true)
        setSelectedId && setSelectedId(selectedIdList)
      } else {
        setSelectedAll(false)
        setSelectedId && setSelectedId([])
      }
    }
  }

  const parsedData = (value: any, type: string) => {
    if (value) {
      switch (type) {
        case 'datetime-local':
          return moment(value).format('DD MMMM YYYY')
        default:
          return value
      }
    } else {
      return '-'
    }
  }

  useEffect(() => {
    if (tableSpec) {
      setFieldKeyList(Object.keys(tableSpec.fields))
    }
  }, [tableSpec])

  const IconTypes = (type: string) => {
    switch (type) {
      case 'edit':
        return <FaEdit />
      case 'trash':
        return <FaTrash />
    }
  }

  return (
    <>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-200 cursor-pointer">
            <th className="whitespace-nowrap py-3 px-3">No</th>
            {tableSpec && (
              <>
                {tableSpec.can_bulk && (
                  <th className="whitespace-nowrap py-3 px-3">
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      className="form-checkbox rounded bg-[#EBEDF3] text-indigo-600 border-none focus:border-none focus:outline-indigo-600"
                      onClick={selectAll}
                      readOnly
                    />
                  </th>
                )}
                {fieldKeyList?.map(
                  (key, idx) =>
                    !tableSpec.fields[key]?.is_hidden_in_list && (
                      <th className="whitespace-nowrap py-3 px-3" key={idx}>
                        {tableSpec.fields[key]?.label}
                      </th>
                    )
                )}
                {(tableSpec.can_delete || tableSpec.can_detail || tableSpec.can_edit) && (
                  <th className="whitespace-nowrap py-3 px-3">{labelAction || 'Aksi'}</th>
                )}
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {pagination &&
            tableSpec &&
            tableData?.map((row, idx) => (
              <tr className="border-b border-gray-200" key={idx}>
                <td className="px-3 text-black py-3 text-center">{idx + 1 + pagination.size * pagination.number}</td>
                {tableSpec.can_bulk && (
                  <td className="px-3 text-black py-4 text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded bg-[#EBEDF3] text-indigo-600 border-none focus:border-none focus:outline-indigo-600"
                      checked={selectedId && selectedId.includes(row.id)}
                      onClick={() => {
                        if (selectedId && !selectedId.includes(row.id)) {
                          setSelectedId && setSelectedId((prev) => [...prev, row.id])
                        } else {
                          setSelectedId && setSelectedId((prev) => _.without(prev, row.id))
                        }
                      }}
                      readOnly
                    />
                  </td>
                )}
                {tableSpec &&
                  fieldKeyList?.map((key, idx) => {
                    const nestedSpec = {
                      valueKey: tableSpec.fields[key].table_value_mapping?.value,
                      dataKey: tableSpec.fields[key].table_value_mapping?.relation,
                    }

                    const defaultCell = (
                      <>
                        {tableSpec.fields[key].form_field_type === 'INPUT_IMAGE_UPLOAD' && (
                          <td className="px-3 text-black py-3 text-center flex justify-center">
                            <AvatarGroup chained maxCount={4} omittedAvatarProps={{ shape: 'circle' }}>
                              <>
                                {row[key].map((item: File, idx: number) => (
                                  <Avatar className="cursor-pointer" shape="circle" src={item.original_url} key={idx} />
                                ))}
                              </>
                            </AvatarGroup>
                          </td>
                        )}
                        {tableSpec.fields[key].form_field_type === 'INPUT_FILE_UPLOAD' && (
                          <td className="px-3 text-black py-3 text-center flex justify-center">
                            <Modal
                              title="Uploaded Files"
                              triggerButton={
                                <Button
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-400"
                                  size="xs"
                                  icon={<MdDownload />}
                                />
                              }
                            >
                              <>
                                {row[key].length > 0 ? (
                                  row[key].map((item: File, idx: number) => (
                                    <div className="w-full flex justify-between items-center" key={idx}>
                                      <span>{item.file_name}</span>
                                      <a
                                        href={item.original_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        download={item.file_name}
                                      >
                                        <Button
                                          className="bg-gray-100 hover:bg-gray-200 text-gray-400"
                                          size="xs"
                                          icon={<MdDownload />}
                                        />
                                      </a>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-center">
                                    <p>Tidak memiliki file</p>
                                  </div>
                                )}
                              </>
                            </Modal>
                          </td>
                        )}
                        {tableSpec.fields[key].form_field_type !== 'INPUT_IMAGE_UPLOAD' &&
                          tableSpec.fields[key].form_field_type !== 'INPUT_FILE_UPLOAD' && (
                            <td
                              className={classNames(
                                tableSpec.fields[key]?.type === 'number' ||
                                  (tableSpec.fields[key]?.type === 'datetime-local' && 'text-center'),
                                'px-3 text-black py-3'
                              )}
                              key={idx}
                            >
                              {tableSpec.fields[key].table_value_mapping
                                ? nestedSpec.dataKey &&
                                  nestedSpec.valueKey &&
                                  parsedData(
                                    getValueByPath(row[nestedSpec.dataKey], nestedSpec.valueKey),
                                    tableSpec.fields[key]?.type
                                  )
                                : parsedData(getValueByPath(row, key), tableSpec.fields[key]?.type)}
                            </td>
                          )}
                      </>
                    )

                    return (
                      <Fragment key={idx}>
                        {!tableSpec.fields[key]?.is_hidden_in_list && (
                          <>
                            {customCell
                              ? customCell({
                                  name: key,
                                  fields: tableSpec.fields,
                                  value: !nestedSpec.dataKey ? row[key] : row[nestedSpec.dataKey],
                                  defaultCell: defaultCell,
                                })
                              : defaultCell}
                          </>
                        )}
                      </Fragment>
                    )
                  })}

                <td className="border-b border-gray-200 py-3">
                  <div className="flex flex-row items-center justify-center gap-x-2">
                    {tableSpec.can_detail && !onClickDetail ? (
                      <Modal
                        triggerButton={<Button className="bg-gray-100 text-gray-400" size="xs" icon={<FaEye />} />}
                        key={idx}
                      >
                        {({ closeModal }) => (
                          <FormLowcode
                            asDetail
                            id={row.id}
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
                            message={message}
                          />
                        )}
                      </Modal>
                    ) : (
                      <Button
                        className="bg-gray-100 text-gray-400"
                        size="xs"
                        icon={<FaEye />}
                        onClick={() => onClickDetail?.(row.id)}
                      />
                    )}

                    {tableSpec?.field_action.map((action, idx) => {
                      const ButtonAction = () => (
                        <Button
                          className="bg-gray-100 hover:bg-gray-200 text-gray-400"
                          size="xs"
                          icon={IconTypes(action.icon)}
                          onClick={() => handleAction(action, row.id)}
                        />
                      )

                      if (action.label === 'Edit') {
                        return !onClickEdit
                          ? tableSpec.can_edit && (
                              <Modal triggerButton={<ButtonAction />} key={idx}>
                                {({ closeModal }) => (
                                  <FormLowcode
                                    id={row.id}
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
                                    message={message}
                                  />
                                )}
                              </Modal>
                            )
                          : tableSpec.can_edit && <ButtonAction key={idx} />
                      } else if (action.label === 'Hapus') {
                        return tableSpec.can_delete && <ButtonAction key={idx} />
                      }
                    })}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableLowcode
