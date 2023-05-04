import { FC, useCallback, useEffect, useState } from 'react'
import { Table as TableView } from '@/components/Table'
import { IALurkerjaTable, Pagination } from '@/types'
import axios from 'axios'
import _ from 'underscore'

const Table: FC<IALurkerjaTable> = ({ spec, url }) => {
  const [data, setData] = useState()
  const [pagination, setPagination] = useState<Pagination>()

  const getData = useCallback(
    ({ signal }: { signal: AbortSignal }) => {
      axios.get('https://api.dignas.space/crud/portfolio/v-public-index', { signal }).then((res) => {
        if (res.status === 200) {
          const result = res.data.data
          setData(result.content)
          setPagination(_.omit(result, 'content'))
        }
      })
    },
    [url]
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
      <TableView listSpec={spec} tableData={data} />
    </>
  )
}

export default Table
