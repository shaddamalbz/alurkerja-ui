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
  module?: string
}

const getTableData = ({ baseUrl, tableName, renderState, id, filter, search, pageConfig, module }: GetTableData) => {
  const [tableData, setTableData] = useState<{ id: number; [x: string]: any }[]>()
  const [detail, setDetail] = useState<{ [x: string]: any }>()
  const [pagination, setPagination] = useState<PaginationLowcode>()
  const [loading, setLoading] = useState<boolean>(true)

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
    let url = baseUrl + `/api/${module || 'crud'}/${tableName}`

    if (id) {
      url += `/${id}`
    } else {
      if (filter) {
        url += '?' + filterQuery
      }

      if (search && search !== '') {
        if (filter) {
          url += `&search=${search}`
        } else {
          url += `?search=${search}`
        }
      }

      if (pageConfig) {
        const pagintaionQuery = `page=${pageConfig?.page}&limit=${pageConfig?.limit}`
        if (!filter && !search) {
          url += `?${pagintaionQuery}`
        } else {
          url += `&${pagintaionQuery}`
        }
      }
    }

    const { status, data } = await axios({ url: url, method: 'get' })
    if (status === 200) {
      const result = data.data
      if (id) {
        setDetail(result)
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

  return { tableData, loading, pagination, detail }
}

export default getTableData
