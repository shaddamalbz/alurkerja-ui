import { useState, useEffect, useContext } from 'react'

import { TableSpec } from '@/types'
import { AuthContext } from '@/context'

const getTableSpec = (baseUrl: string, table: string, module?: string) => {
  const axiosInstance = useContext(AuthContext)

  const [tableSpec, setTableSpec] = useState<TableSpec>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState()

  const fetch = () => {
    setLoading(true)
    axiosInstance
      .get(baseUrl + `/api/${module || 'crud'}/${table}/spec`)
      .then((res: any) => {
        if (res.status === 200) {
          setTableSpec(res.data.data)
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
