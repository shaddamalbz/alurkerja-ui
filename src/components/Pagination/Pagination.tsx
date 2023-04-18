import { PaginationProps } from '@/types'
import { useContext, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import _ from 'underscore'

const Pagination = ({ pagination, pageConfig, setPageConfig }: PaginationProps) => {
  var totalShowedPagination = 3
  const [paginationRange, setPaginationRange] = useState<any[]>([])

  useEffect(() => {
    if (pagination) {
      var start = pagination.number - totalShowedPagination > 0 ? pagination.number - totalShowedPagination : 0
      var end =
        pagination.number + totalShowedPagination < pagination.total_page
          ? pagination.number + totalShowedPagination
          : pagination.total_page
      setPaginationRange(_.range(start, end))
    }
  }, [pagination])

  return (
    <>
      {pagination && (
        <div className="text-xs md:text-base sm:text-sm py-4 px-4 border-1 rounded alurkerja-pagination">
          <div className="flex justify-between item-center relative">
            <nav>
              {pagination.total_page > 0 && (
                <ul className="pagination flex items-center gap-x-1">
                  {pagination.number > totalShowedPagination - 1 && (
                    <li
                      onClick={() => {
                        if (!pagination.first) {
                          setPageConfig({ ...pageConfig, ...{ page: 0 } })
                        }
                      }}
                    >
                      <span className="flex flex-row items-center justify-center cursor-pointer w-8 h-8 page-link relative py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded focus:shadow-none bg-gray-100">
                        <FaChevronLeft color="#5E6278" />
                        <FaChevronLeft color="#5E6278" />
                      </span>
                    </li>
                  )}
                  {!pagination.first && (
                    <li
                      onClick={() => {
                        if (!pagination.first) {
                          setPageConfig({
                            ...pageConfig,
                            ...{ page: pagination.number - 1 },
                          })
                        }
                      }}
                    >
                      <span className="flex flex-row items-center justify-center cursor-pointer w-8 h-8 page-link relative py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded focus:shadow-none bg-gray-100">
                        <FaChevronLeft size={7} color="#5E6278" />
                      </span>
                    </li>
                  )}
                  {paginationRange.map((page: number) => {
                    return (
                      <li
                        key={page}
                        onClick={() => {
                          if (pagination.number !== page) {
                            setPageConfig({ ...pageConfig, ...{ page: page } })
                          }
                        }}
                        className={pagination.number === page ? 'active' : ''}
                      >
                        <span
                          className={
                            'flex flex-row items-center justify-center cursor-pointer w-8 h-8 page-link relative py-1.5 px-3 rounded border-0 outline-none transition-all duration-300  focus:shadow-none' +
                            (pagination.number === page
                              ? ' bg-blue-400 text-white hover:bg-blue-500 outline-none transition-all duration-300 rounded focus:shadow-none'
                              : ' bg-gray-100 text-gray-400 hover:bg-gray-200 woutline-none transition-all duration-300 rounded focus:shadow-none')
                          }
                        >
                          {page + 1}
                        </span>
                      </li>
                    )
                  })}
                  {!pagination.last && (
                    <li
                      className="page-item"
                      onClick={() => {
                        if (!pagination.last) {
                          setPageConfig({
                            ...pageConfig,
                            ...{ page: pagination.number + 1 },
                          })
                        }
                      }}
                    >
                      <span className="flex flex-row items-center justify-center cursor-pointer w-8 h-8 page-link relative py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded focus:shadow-none bg-gray-100">
                        <FaChevronRight size={7} color="#5E6278" />
                      </span>
                    </li>
                  )}
                  {pagination.number - 1 < pagination.total_page && !pagination.last && (
                    <li
                      className="page-item"
                      onClick={() => {
                        if (!pagination.last) {
                          setPageConfig({
                            ...pageConfig,
                            ...{ page: pagination.total_page - 1 },
                          })
                        }
                      }}
                    >
                      <span className="flex flex-row items-center justify-center cursor-pointer w-8 h-8 page-link relative py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded focus:shadow-none bg-gray-100">
                        <FaChevronRight color="#5E6278" />
                        <FaChevronRight color="#5E6278" />
                      </span>
                    </li>
                  )}
                </ul>
              )}
            </nav>
            <div className="flex flex-row gap-2 items-center ">
              <select
                onChange={(e) => {
                  setPageConfig({
                    ...pageConfig,
                    ...{ limit: Number(e.target.value), page: 0 },
                  })
                }}
                className="alurkerja-form w-full  rounded border border-gray-100 text-xs bg-gray-100 p-2 pr-10"
                style={{ paddingRight: '30px' }}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </select>
              <span className="whitespace-nowrap text-sm font-light">
                {`Memunculkan data dari ${
                  pagination.number * pagination.size === 0 ? 1 : pagination.number * pagination.size
                } sampai  ${
                  (pagination.number + 1) * pagination.size > pagination.total_elements
                    ? pagination.total_elements
                    : (pagination.number + 1) * pagination.size
                } total ${pagination.total_elements}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
