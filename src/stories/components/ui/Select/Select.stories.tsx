import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@/components/ui'
import { useState } from 'react'

const meta = {
  title: 'Components/Select',
  component: Select,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: 'label1', value: 1 },
      { label: 'label2', value: 2 },
    ],
  },
}

export const DefaultValue: Story = {
  args: {
    options: [
      { label: 'label1', value: 1 },
      { label: 'label2', value: 2 },
    ],
    defaultValue: { label: 'label2', value: 2 },
  },
}

export const onChange: Story = {
  render: (args) => {
    const [value, setValue] = useState()
    return (
      <>
        <Select
          options={[
            { label: 'label1', value: 1 },
            { label: 'label2', value: 2 },
          ]}
          onChange={(selected: any) => setValue(selected.value)}
        />
        {value}
      </>
    )
  },
}
