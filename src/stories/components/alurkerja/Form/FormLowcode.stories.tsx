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

export const Base: Story = {
  args: {
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'rekod-status-prestasi',
  },
  render: (args) => {
    const { formState, handleSubmit, control, setValue, watch } = useForm()

    return (
      <AlurkerjaForm
        {...args}
        formState={formState}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        onSubmit={(data) => console.log(data)}
      />
    )
  },
}
