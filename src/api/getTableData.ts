import { useState, useEffect, useContext, useCallback } from 'react'
import _ from 'underscore'

import { PaginationLowcode } from '@/types'
import { AuthContext } from '@/context'

interface GetTableData {
  baseUrl: string
  tableName: string
  renderState?: number
  id?: number
  filter?: { [x: string]: any }
  search?: string
  pageConfig?: { limit: number; page: number }
  module?: string
  orderBy?: 'asc' | 'desc'
  sortBy?: string
}

const getTableData = ({
  baseUrl,
  tableName,
  renderState,
  id,
  filter,
  search,
  pageConfig,
  module,
  orderBy,
  sortBy,
}: GetTableData) => {
  const axiosInstance = useContext(AuthContext)

  const [tableData, setTableData] = useState<{ id: number; [x: string]: any }[]>()
  const [detail, setDetail] = useState<{ [x: string]: any }>()
  const [pagination, setPagination] = useState<PaginationLowcode>()
  const [loading, setLoading] = useState<boolean>(true)

  const parsedFilter = useCallback(() => {
    let query = ''
    if (filter) {
      const listFilter = Object.entries(filter)

      listFilter.forEach(([key, value], idx) => {
        if (value.toString() && value !== '') {
          query += `filter[${key}]=${value}`
          if (idx + 1 !== listFilter.length) {
            query += '&'
          }
        }
      })
    }

    return query
  }, [filter])

  const fetch = async () => {
    setLoading(true)

    const filterQuery = parsedFilter()

    let url = `${baseUrl}/api/${module || 'crud'}/${tableName}`

    if (id) {
      url += `/${id}`
    } else {
      if (filter) {
        url += `?${filterQuery}`
      }

      if (search && search !== '') {
        url += `${filter ? '&' : '?'}search=${search}`
      }

      if (pageConfig) {
        const paginationQuery = `page=${pageConfig.page}&limit=${pageConfig.limit}`
        url += `${filter || search ? '&' : '?'}${paginationQuery}`
      }

      if (orderBy) {
        url += `${filter || search || pageConfig ? '&' : '?'}asc=${orderBy === 'asc'}`
      }

      if (sortBy) {
        url += `${filter || search || pageConfig || orderBy ? '&' : '?'}sort=${sortBy}`
      }
    }

    try {
      const { data, status } = await axiosInstance.get(url)
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
    } catch (error) {
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [tableName, baseUrl, renderState, filter, search, pageConfig, orderBy, sortBy])

  return { tableData, loading, pagination, detail }
}

export default getTableData
