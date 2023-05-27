import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

import { TableLowcodeView } from '@/components/ui/Table'
import { Badge, Button, Spinner } from '@/components/ui'

import getTableSpec from '@/api/getTableSpec'
import getTableData from '@/api/getTableData'
import { IAlurkerjaTableLowcode } from '@/types'

import TableLayout from './components/TableLayout'

export const TableLowcode: FC<IAlurkerjaTableLowcode> = (props) => {
  const {
    title,
    baseUrl,
    module,
    tableName,
    filterBy,
    setFilterBy,
    pageConfig,
    setPageConfig,
    renderState,
    setRenderState,
    search,
    setSearch,
    selectedRow,
    setSelectedRow,
    customCell,
    onClickCreate,
    onClickEdit,
    onClickDetail,
    headerElement,
    customField,
    textSubmitButton,
    customFilterField,
    onClickDelete,
    onDeleteConfirm,
    labelAction,
    message,
    layout,
    canFilter,
    formConfig,
  } = props

  const [selectedAll, setSelectedAll] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>()
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>()

  const { tableSpec, loading } = getTableSpec(baseUrl, tableName, module)

  const {
    tableData,
    pagination,
    loading: loadingData,
  } = getTableData({
    baseUrl: baseUrl,
    tableName: tableName,
    renderState: renderState,
    filter: filterBy,
    search: search,
    pageConfig: pageConfig,
    module: module,
    sortBy: sortBy,
    orderBy: orderBy,
  })

  const handleBulkDelete = () => {
    Swal.fire({
      title: 'Hapus',
      text: `Apakah kamu yakin ingin menghapus ${selectedRow ? selectedRow.length : 0} item`,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Hapus',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Data telah berhasil dihapus',
        }).then(() => setRenderState && setRenderState((prev) => prev + 1))
      }
    })
  }

  const buttonBulkDelete = () => {
    if (selectedRow && selectedRow.length > 0) {
      return (
        <Badge content={selectedRow.length} maxCount={3}>
          <Button size="xs" icon={<FaTrash />} onClick={handleBulkDelete} />
        </Badge>
      )
    } else {
      return null
    }
  }

  useEffect(() => {
    setFilterBy && setFilterBy(undefined)
    setSearch && setSearch('')
  }, [tableName])

  return !loading ? (
    <section className="px-4">
      <TableLayout
        title={title}
        baseUrl={baseUrl}
        tableName={tableName}
        module={module}
        tableSpec={tableSpec}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        pagination={pagination}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        extraButton={buttonBulkDelete}
        onClickCreate={onClickCreate}
        setRenderState={setRenderState}
        headerElement={headerElement}
        customField={customField}
        textSubmitButton={textSubmitButton}
        customFilterField={customFilterField}
        message={message}
        canFilter={canFilter}
        formConfig={formConfig}
      >
        {!loadingData ? (
          <TableLowcodeView
            baseUrl={baseUrl}
            tableName={tableName}
            module={module}
            tableData={tableData}
            tableSpec={tableSpec}
            pagination={pagination}
            setRenderState={setRenderState}
            selectedAll={selectedAll}
            setSelectedAll={setSelectedAll}
            selectedId={selectedRow || []}
            setSelectedId={setSelectedRow}
            customCell={customCell}
            onClickEdit={onClickEdit}
            customField={customField}
            onClickDelete={onClickDelete}
            onDeleteConfirm={onDeleteConfirm}
            onClickDetail={onClickDetail}
            labelAction={labelAction}
            message={message}
            sortBy={sortBy}
            setSortBy={setSortBy}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            layout={layout}
            formConfig={formConfig}
          />
        ) : (
          <div className="w-fit mx-auto my-6">
            <Spinner />
          </div>
        )}
      </TableLayout>
    </section>
  ) : (
    <section className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Spinner size={32} />
    </section>
  )
}

export default TableLowcode
