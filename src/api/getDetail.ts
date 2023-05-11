import { useState, useEffect } from 'react'
import _ from 'underscore'
import axios from 'axios'

interface GetDetail {
  baseUrl: string
  tableName: string
  renderState?: number
  id?: number
  module?: string
}

const GetDetail = ({ baseUrl, tableName, renderState, id, module }: GetDetail) => {
  const [detail, setDetail] = useState<{ [x: string]: any }>()

  const [loading, setLoading] = useState<boolean>(true)

  const fetch = async () => {
    setLoading(true)

    let url = baseUrl + `/api/${module || 'crud'}/${tableName}/${id}`

    const { status, data } = await axios({ url: url, method: 'get' })
    if (status === 200) {
      const result = data.data

      setDetail(result)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      fetch()
    }
  }, [id, tableName, baseUrl, renderState])

  return { loading, detail }
}

export default GetDetail
