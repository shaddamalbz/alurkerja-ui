import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { AlurkerjaForm } from '@/components/alurkerja'

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
  render: (args) => {
    const { formState, handleSubmit, control, setValue } = useForm()
    return (
      <AlurkerjaForm
        baseUrl="https://kpm-sys.merapi.javan.id"
        tableName="jpn"
        formState={formState}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        customField={({ field, setValue, defaultField }) => {
          const fieldSpec = field[1]
          if (fieldSpec.name === 'created_at') {
            return <div>custom field</div>
          } else {
            return defaultField
          }
        }}
      />
    )
  },
}
