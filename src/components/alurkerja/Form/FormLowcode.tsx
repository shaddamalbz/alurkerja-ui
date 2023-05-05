import { FC, useState } from 'react'
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

export const FormLowcode: FC<IAlurkerjaFormLowcode> = (props) => {
  const { baseUrl, tableName, handleSubmit, onSubmit, control, formState, setValue, customField, onSuccess, onError } =
    props

  const { createSpec, fieldList } = useFormSpec({ baseUrl, tableName })
  const { tableSpec, loading: onFetching } = getTableSpec(baseUrl, tableName)

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const onSubmitFunction = async (data: FieldValues) => {
    if (createSpec) {
      if (onSubmit) {
        onSubmit(data)
      } else {
        setLoadingSubmit(true)
        const { path, method } = createSpec
        try {
          const response = await axios(baseUrl + path, { method: method, data: data })
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

  return (
    <section className="p-4 space-y-6">
      <h5 className="text-xl font-bold">Tambah {tableSpec?.label}</h5>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        {!onFetching ? (
          <>
            {fieldList.map((field: [string, FieldProperties], idx: number) => {
              const name = field[0]
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
                        defaultField: <InputTypes fieldSpec={fieldSpec} name={name} setValue={setValue} />,
                      })
                    ) : (
                      <InputTypes fieldSpec={fieldSpec} name={name} setValue={setValue} />
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
