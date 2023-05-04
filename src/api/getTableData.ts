import { useState, useEffect } from 'react'
import _ from 'underscore'
import axios from 'axios'

import { PaginationLowcode } from '@/types'

interface GetTableData {
  baseUrl: string
  tableName: string
  renderState?: number
  id?: number
  filter?: { [x: string]: any }
  search?: string
  pageConfig?: { limit: number; page: number }
}

const getTableData = ({ baseUrl, tableName, renderState, id, filter, search, pageConfig }: GetTableData) => {
  const [tableData, setTableData] = useState<{ id: number; [x: string]: any }[]>()
  const [pagination, setPagination] = useState<PaginationLowcode>()
  const [loading, setLoading] = useState<boolean>(true)

  const pagintaionQuery = `page=${pageConfig?.page}&limit=${pageConfig?.limit}`

  const parseFilter = () => {
    let query = ''
    if (filter) {
      const listFilter = Object.entries(filter)
      listFilter.forEach(([key, value], idx) => {
        if (value && value !== '') {
          query += `filter[${key}]=${value}`
          if (idx + 1 !== listFilter.length) {
            query += '&'
          }
        }
      })
    }
    return query
  }

  const fetch = async () => {
    setLoading(true)

    const filterQuery = parseFilter()
    let url = baseUrl + `/api/crud/${tableName}`

    if (id) {
      url += `/${id}`
    } else if (filter && !id) {
      url += '?' + filterQuery
    }

    if (search && filter) {
      url += `&search=${search}`
    } else if (search && !filter) {
      url += `?search=${search}`
    }

    if (pageConfig && filter) {
      url += `&${pagintaionQuery}`
    } else if (pageConfig && !filter) {
      url += `?${pagintaionQuery}`
    }

    const { status, data } = await axios({ url: url, method: 'get' })
    if (status === 200) {
      const result = data.data
      if (id) {
        setTableData(result)
      } else {
        const pagination = _.omit(result, 'content')
        setTableData(result.content)
        setPagination(pagination)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [tableName, baseUrl, renderState, filter, search, pageConfig])

  return { tableData, loading, pagination }
}

export default getTableData
