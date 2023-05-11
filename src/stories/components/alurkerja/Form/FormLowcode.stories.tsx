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
    const { formState, handleSubmit, control, setValue } = useForm()
    return (
      <AlurkerjaForm
        baseUrl={args.baseUrl}
        tableName={args.tableName}
        formState={formState}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        onSubmit={(data) => console.log(data)}
        customField={({ field, setValue, defaultField }) => {
          const fieldSpec = field[1]
          if (fieldSpec.name === 'SENARAI_REKOD_AKTIVITI_ID') {
            return (
              <Select
                options={[{ label: 'opsi1', value: 1 }]}
                onChange={(selected: any) => setValue(fieldSpec.name.toLowerCase(), selected.value)}
              />
            )
          }
          return defaultField
        }}
      />
    )
  },
}
