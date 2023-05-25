import { FC, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { IAlurkerjaForm } from '@/types'
import { getValueByPath } from '@/utils'

const Form: FC<IAlurkerjaForm> = ({ description, title, listSpec, inline = false, disable = false, withStatus }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
    unregister,
  } = useForm()

  return (
    <>
      {title && (
        <div className="my-4 mx-4 flex justify-between items-center">
          <h1 className="text-2xl py-4">{title}</h1>

          {description && <span>{description}</span>}
          <hr />
        </div>
      )}
      <form>
        {listSpec.map((spec, idx) => {
          let specItem: any = spec
          if (spec.hasOwnProperty('metadata')) {
            specItem = { ...spec, ...spec.metadata }
          }
          const inputProps = {
            required: specItem.required,
            watch: watch,
            key: specItem.name,
            defaultValue: specItem.defaultValue || specItem.value || '',
            setValue: setValue,
            label: specItem.label,
            name: specItem.name,
            type: specItem.type,
            control: control,
            withStatus: withStatus,
            registerfnc: register,
            unregisterfnc: unregister,
            renderCondition: specItem.renderCondition,
            errorMessage: getValueByPath(errors, specItem.name),
            errors: errors,
            format: specItem.format,
            fileType: specItem.fileType,
            inline: inline,
            disabled: disable || specItem.disabled,
            tooltips: specItem.tooltips,
            rules: specItem.rules,
            listOption: specItem.listOption,
          }
          return <Fragment key={idx}></Fragment>
        })}
        <div className="flex flex-row gap-2 justify-end pb-8 mx-4">
          <button>Submit</button>
        </div>
      </form>
    </>
  )
}

export default Form
