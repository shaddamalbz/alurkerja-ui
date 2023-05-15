import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

import { TableLowcode as TableView } from '@/components/Table'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import TableLayout from '@/components/alurkerja/TableLayout'

import getTableSpec from '@/api/getTableSpec'
import getTableData from '@/api/getTableData'
import { IAlurkerjaTableLowcode } from '@/types'

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
    headerElement,
    customField,
  } = props

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
  })

  const [selectedAll, setSelectedAll] = useState<boolean>(false)

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
        filter={filterBy}
        setFilter={setFilterBy}
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
      >
        {!loadingData ? (
          <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
            <TableView
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
            />
          </div>
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
