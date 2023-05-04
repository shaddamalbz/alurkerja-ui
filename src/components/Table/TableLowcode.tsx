import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import axios from 'axios'
import classNames from 'classnames'
import _ from 'underscore'
import moment from 'moment'
import { TableLowcodeProps, FieldActionProperties } from '@/types'

import Button from '@/components/ui/Button'

const TableLowcode = (props: TableLowcodeProps) => {
  const {
    baseUrl,
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
  } = props

  const [fieldKeyList, setFieldKeyList] = useState<string[]>()

  const handleAction = (actionSpec: FieldActionProperties, id: number) => {
    const { label, confirm, path } = actionSpec
    if (label === 'Edit') {
      onClickEdit?.(actionSpec, id)
    } else if (label === 'Hapus') {
      if (confirm) {
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
            const res = await axios({ method: actionSpec.method, url: baseUrl + path.replace('{id}', id.toString()) })
            if (res.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Data telah berhasil dihapus',
              }).then(() => setRenderState && setRenderState((prev) => prev + 1))
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
            {tableSpec?.can_bulk && (
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
            {tableSpec &&
              fieldKeyList?.map(
                (key, idx) =>
                  !tableSpec.fields[key]?.is_hidden_in_list && (
                    <th className="whitespace-nowrap py-3 px-3" key={idx}>
                      {tableSpec.fields[key]?.label}
                    </th>
                  )
              )}
            <th className="whitespace-nowrap py-3 px-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pagination &&
            tableSpec &&
            tableData?.map((row, idx) => (
              <tr className="border-b border-gray-200" key={idx}>
                <td className="px-3 text-black py-2 text-center">{idx + 1 + pagination.size * pagination.number}</td>
                {tableSpec.can_bulk && (
                  <td className="px-3 text-black py-2 text-center">
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
                    const defaultCell = (
                      <td
                        className={classNames(
                          tableSpec.fields[key]?.type === 'number' || tableSpec.fields[key]?.type === 'datetime-local'
                            ? 'text-center'
                            : '',
                          'px-3 text-black py-2'
                        )}
                        key={idx}
                      >
                        {parsedData(row[key], tableSpec.fields[key]?.type)}
                      </td>
                    )
                    return (
                      <>
                        {!tableSpec.fields[key]?.is_hidden_in_list && (
                          <>
                            {customCell
                              ? customCell({
                                  name: key,
                                  fields: tableSpec.fields,
                                  value: row[key],
                                  defaultCell: defaultCell,
                                })
                              : defaultCell}
                          </>
                        )}
                      </>
                    )
                  })}

                <td className="border-b border-gray-200">
                  <div className="flex flex-row items-center justify-center gap-x-2">
                    {tableSpec?.field_action.map((action, idx) => (
                      <Button
                        size="xs"
                        key={idx}
                        icon={IconTypes(action.icon)}
                        onClick={() => handleAction(action, row.id)}
                      >
                        {action.label}
                      </Button>
                    ))}
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
