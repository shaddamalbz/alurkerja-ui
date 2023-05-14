import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { AlurkerjaForm } from '@/components/alurkerja'
import { Select } from '@/components/ui'

const meta = {
  title: 'Components/Alurkerja/FormLowcode',
  component: AlurkerjaForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AlurkerjaForm>

export default meta
type Story = StoryObj<typeof AlurkerjaForm>

export const Default: Story = {
  args: {
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'pengurusan-rekod-aktiviti-pemohon',
  },
  render: (args) => {
    const { formState, handleSubmit, control, setValue, watch } = useForm()

    return (
      <AlurkerjaForm
        id={9}
        baseUrl={args.baseUrl}
        tableName={args.tableName}
        formState={formState}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        onSubmit={(data) => console.log(data)}
        customField={({ field, setValue, defaultField, value }) => {
          const fieldSpec: any = field[1]
          if (fieldSpec.name === 'senarai_rekod_aktiviti_id') {
            const option = fieldSpec.select_options.option
            const parsedOption = Object.keys(option).map((label, value) => ({
              label: label.replace('_', ' '),
              value: value,
            }))

            const defaultValue = parsedOption.filter((option) => option.value === +value)

            return (
              <Select
                options={parsedOption}
                onChange={(selected: any) => setValue(fieldSpec.name.toLowerCase(), selected.value)}
                defaultValue={defaultValue[0]}
              />
            )
          }
          return defaultField
        }}
      />
    )
  },
}
