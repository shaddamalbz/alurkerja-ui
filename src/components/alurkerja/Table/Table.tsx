import { FC, useCallback, useEffect, useState } from 'react'
import { Table as TableView } from '@/components/Table'
import PaginationView from '@/components/Pagination'
import { IALurkerjaTable, Pagination } from '@/types'
import axios from 'axios'
import _ from 'underscore'

const Table: FC<IALurkerjaTable> = ({ spec, url, pageConfig, setPageConfig }) => {
  const [data, setData] = useState()
  const [pagination, setPagination] = useState<Pagination>()

  const getData = useCallback(
    ({ signal }: { signal: AbortSignal }) => {
      axios
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
