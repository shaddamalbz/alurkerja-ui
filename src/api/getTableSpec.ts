import { useState, useEffect } from 'react'
import axios from 'axios'
import { TableSpec } from '@/types'

const getTableSpec = (baseUrl: string, table: string) => {
  const [tableSpec, setTableSpec] = useState<TableSpec>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState()

  const fetch = () => {
    setLoading(true)
    axios
      .get(baseUrl + `/api/crud/${table}/spec`)
      .then((res: any) => {
        if (res.status === 200) {
          setTableSpec(res.data)
        }
      })
      .catch((err) => setError(err.response))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetch()
  }, [table, baseUrl])

  return { tableSpec, loading, error }
}

export default getTableSpec
