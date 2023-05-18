import { FC, useCallback, useEffect, useState, useContext } from 'react'
import { Table as TableView } from '@/components/Table'
import PaginationView from '@/components/Pagination'
import { IALurkerjaTable, Pagination } from '@/types'
import { AuthContext } from '@/context'
import _ from 'underscore'

const Table: FC<IALurkerjaTable> = ({ spec, url, pageConfig, setPageConfig }) => {
  const axiosInstance = useContext(AuthContext)

  const [data, setData] = useState()
  const [pagination, setPagination] = useState<Pagination>()

  const getData = useCallback(
    ({ signal }: { signal: AbortSignal }) => {
      axiosInstance
        .get(url, {
          signal,
          params: {
            page: pageConfig?.page,
            limit: pageConfig?.limit,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const result = res.data.data
            setData(result.content)
            setPagination(_.omit(result, 'content'))
          }
        })
    },
    [url, pageConfig]
  )

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getData({ signal })

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <>
      <TableView listSpec={spec} tableData={data} Pagination={pagination} pageConfig={pageConfig} />
      <PaginationView pageConfig={pageConfig} setPageConfig={setPageConfig} pagination={pagination} />
    </>
  )
}

export default Table
