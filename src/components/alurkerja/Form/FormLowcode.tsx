import { FC, useState, useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'

import getTableSpec from '@/api/getTableSpec'
import { useFormSpec } from '@/hooks'
import { FieldProperties, IAlurkerjaFormLowcode } from '@/types'

// components
import { Button, Skeleton } from '@/components/ui'
import InputTypes from '@/components/alurkerja/InputTypes'
import InputLayout from '@/components/alurkerja/InputLayout'
import getTableData from '@/api/getTableData'

export const FormLowcode: FC<IAlurkerjaFormLowcode> = (props) => {
  const {
    baseUrl,
    tableName,
    module,
    handleSubmit,
    onSubmit,
    control,
    formState,
    setValue,
    customField,
    onSuccess,
    onError,
    id,
    disabled,
  } = props

  const { createSpec, editSpec, fieldList } = useFormSpec({ baseUrl, tableName, module })
  const { tableSpec, loading: onFetching } = getTableSpec(baseUrl, tableName, module)
  const { detail } = getTableData({ baseUrl, tableName, id, module })

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const onSubmitFunction = async (data: FieldValues) => {
    if (createSpec) {
      if (onSubmit) {
        onSubmit(data)
      } else {
        setLoadingSubmit(true)
        if (id && editSpec) {
          const { path, method } = editSpec
          try {
            const response = await axios(baseUrl + path.toLowerCase() + '/' + id, { method: method, data: data })
            if (response.status === 201) {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Data telah berhasil ditambahkan',
              }).then(() => onSuccess && onSuccess())
            }
          } catch (error) {
            onError && onError(error)
          } finally {
            setLoadingSubmit(false)
          }
        } else {
          const { path, method } = createSpec
          try {
            const response = await axios(baseUrl + path.toLowerCase(), { method: method, data: data })
            if (response.status === 201) {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Data telah berhasil ditambahkan',
              }).then(() => onSuccess && onSuccess())
            }
          } catch (error) {
            onError && onError(error)
          } finally {
            setLoadingSubmit(false)
          }
        }
      }
    }
  }

  return (
    <section className="p-4 space-y-6">
      <h5 className="text-xl font-bold">
        {!id ? 'Tambah' : disabled ? 'Detail' : 'Edit'} {tableSpec?.label}
      </h5>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        {!onFetching ? (
          <>
            {fieldList.map((field: [string, FieldProperties], idx: number) => {
              const name = field[0].toLowerCase()
              const fieldSpec = field[1]
              if (!fieldSpec.is_hidden_in_create) {
                return (
                  <InputLayout
                    key={idx}
                    name={name}
                    label={fieldSpec.label}
                    formState={formState}
                    rules={fieldSpec.rules}
                    control={control}
                  >
                    {customField ? (
                      customField({
                        field,
                        setValue,
                        defaultField: (
                          <InputTypes baseUrl={baseUrl} fieldSpec={fieldSpec} name={name} setValue={setValue} />
                        ),
                      })
                    ) : (
                      <InputTypes
                        baseUrl={baseUrl}
                        fieldSpec={fieldSpec}
                        name={name}
                        setValue={setValue}
                        defaultValue={detail?.[name]}
                      />
                    )}
                  </InputLayout>
                )
              }
            })}
            <Button type="submit" loading={loadingSubmit}>
              Submit
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <Skeleton height={10} width={40} />
            <Skeleton height={40} />
          </div>
        )}
      </form>
    </section>
  )
}

export default FormLowcode
