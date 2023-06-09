import { FC, useState, useContext } from 'react'
import { FieldValues } from 'react-hook-form'
import Swal from 'sweetalert2'

import getTableSpec from '@/api/getTableSpec'
import { useFormSpec } from '@/hooks'
import { AuthContext } from '@/context'
import { FieldProperties, IAlurkerjaFormLowcode } from '@/types'

// components
import { Button, Skeleton } from '@/components/ui'
import InputTypes from '@/features/Crud/InputTypes'
import InputLayout from '@/features/Crud/InputLayout'
import GetDetail from '@/api/getDetail'

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
    asDetail,
    textSubmitButton,
    title,
    onCancel,
    message,
    hideTitle,
    hideSecondary,
  } = props
  const axiosInstance = useContext(AuthContext)

  const { createSpec, editSpec, fieldList } = useFormSpec({ baseUrl, tableName, module })
  const { tableSpec, loading: onFetching } = getTableSpec(baseUrl, tableName, module)
  const { detail } = GetDetail({ baseUrl, tableName, id, module })

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const onSubmitFunction = async (data: FieldValues) => {
    if (onSubmit) {
      onSubmit(data)
    } else {
      setLoadingSubmit(true)
      if (id && editSpec) {
        const { path, method } = editSpec
        try {
          const response = await axiosInstance(baseUrl + path.toLowerCase().replace('{id}', id.toString()), {
            method: method,
            data: data,
          })
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: message?.success_edit_title || 'Sukses!',
              text: message?.success_edit_text || 'Data telah berhasil diedit',
            }).then(() => onSuccess?.())
          }
        } catch (error) {
          onError && onError(error)
        } finally {
          setLoadingSubmit(false)
        }
      } else {
        if (createSpec) {
          const { path, method } = createSpec
          try {
            const response = await axiosInstance(baseUrl + path, { method: method, data: data })
            if (response.status === 201) {
              Swal.fire({
                icon: 'success',
                title: message?.success_create_title || 'Sukses!',
                text: message?.success_create_text || 'Data telah berhasil ditambahkan',
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
      {!hideTitle && (
        <h5 className="text-xl font-bold">
          {!id ? 'Tambah' : asDetail ? 'Detail' : 'Edit'} {title || tableSpec?.label}
        </h5>
      )}

      <form onSubmit={handleSubmit(onSubmitFunction)}>
        {!onFetching ? (
          <>
            {fieldList.map((field: [string, FieldProperties], idx: number) => {
              const fieldSpec = field[1]
              if (!fieldSpec.is_hidden_in_create) {
                return (
                  <InputLayout
                    key={idx}
                    name={fieldSpec.name.toLowerCase()}
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
                          <InputTypes
                            baseUrl={baseUrl}
                            fieldSpec={fieldSpec}
                            name={fieldSpec.name}
                            setValue={setValue}
                            defaultValue={detail?.[fieldSpec.name]}
                          />
                        ),
                        value: detail?.[fieldSpec.name],
                      })
                    ) : (
                      <InputTypes
                        baseUrl={baseUrl}
                        fieldSpec={fieldSpec}
                        name={fieldSpec.name}
                        setValue={setValue}
                        defaultValue={detail?.[fieldSpec.name]}
                        disabled={disabled}
                        asDetail={asDetail}
                      />
                    )}
                  </InputLayout>
                )
              }
            })}
            <div className="w-fit ml-auto flex gap-4">
              {!hideSecondary && (
                <Button type="button" onClick={() => onCancel?.()}>
                  Kembali
                </Button>
              )}

              {!asDetail && (
                <Button type="submit" loading={loadingSubmit} disabled={loadingSubmit}>
                  {textSubmitButton || 'Submit'}
                </Button>
              )}
            </div>
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
