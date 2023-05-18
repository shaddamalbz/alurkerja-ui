import { useEffect, useState, useContext } from 'react'

import { AuthContext } from '@/context'

import { AppSpec } from '@/types'

const getAppSpec = (baseUrl: string) => {
  const axiosInstance = useContext(AuthContext)

  const [appSpec, setAppSpec] = useState<AppSpec>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState()

  const fetch = () => {
    setLoading(true)
    axiosInstance
      .get('/api/crud/specs')
      .then((res: any) => {
        if (res.status === 200) {
          setAppSpec(res.data)
        }
      })
      .catch((err: any) => setError(err.response))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetch()
  }, [baseUrl])

  return { appSpec, loading, error }
}

export default getAppSpec
