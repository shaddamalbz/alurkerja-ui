import { FC } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

import { TableProps } from '@/types'
import { getValueByPath } from '@/utils'

const Table: FC<TableProps> = ({
  listSpec,
  showColumnNumber = true,
  showColumnAction = true,
  showColumnBatch = false,
  tableData,
  pageConfig = {
    limit: 10,
    page: 0,
  },
}) => {
  const TableHead = () => (
    <thead className="">
      <tr className="text-gray-400 border-b border-gray-200 cursor-pointer">
        {showColumnBatch && (
          <th className="whitespace-nowrap py-3 px-3">
            <input type="checkbox" />
          </th>
        )}
        {showColumnNumber && <th className="whitespace-nowrap py-3 px-3">No</th>}

        {listSpec.map((spec, idx) => {
          return (
            <th className="whitespace-nowrap py-3 px-3" key={idx}>
              <div>
                <div>{spec.label}</div>
              </div>
            </th>
          )
        })}
        {showColumnAction && <th>Aksi</th>}
      </tr>
    </thead>
  )

  const TableBody = () => (
    <>
      {
        <tbody>
          {tableData &&
            tableData.map((data: any, idx) => (
              <tr className="border-b border-gray-200" key={idx}>
                {showColumnBatch && (
                  <td className="whitespace-nowrap py-3 px-3">
                    <input type="checkbox" />
                  </td>
                )}
                {showColumnNumber && (
                  <td className="whitespace-nowrap py-3 px-3 text-center">
                    {pageConfig.page * pageConfig.limit + idx + 1}
                  </td>
                )}
                {listSpec.map((spec, idx) => (
                  <td className="whitespace-nowrap py-3 px-3" key={idx}>
                    {getValueByPath(data, spec.name)}
                  </td>
                ))}
                {showColumnAction && (
                  <td>
                    <div className="relative py-2 px-2 flex justify-center">
                      <div className="flex flex-row items-center gap-x-2">
                        <button className="flex items-center justify-center gap-x-2 bg-green-400 text-white w-fit py-2 px-4 rounded-md">
                          <FaEye /> detail
                        </button>
                        <button className="flex items-center justify-center gap-x-2 bg-blue-400 text-white w-fit py-2 px-4 rounded-md">
                          <FaEdit /> edit
                        </button>
                        <button className="flex items-center justify-center gap-x-2 bg-red-400 text-white w-fit py-2 px-4 rounded-md">
                          <FaTrash /> delete
                        </button>
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      }
    </>
  )

  return (
    <table id="mainTable" className="w-full overflow-y-visible text-sm border-gray-200">
      <TableHead />
      <TableBody />
    </table>
  )
}

export default Table
