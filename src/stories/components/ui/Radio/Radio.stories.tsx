import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from '@/components/ui'
import { useState } from 'react'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    name: 'radio-1',
    listOption: [
      { label: 'radio1', key: 1 },
      { label: 'radio2', key: 2 },
    ],
  },
}

export const OnChange: Story = {
  args: {
    name: 'radio-2',
    listOption: [
      { label: 'radio1', key: 1 },
      { label: 'radio2', key: 2 },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState<any>()
    return (
      <>
        <Radio {...args} onChange={(value) => setValue(value)} />
        value: {value}
      </>
    )
  },
}

export const DefaultValue: Story = {
  args: {
    name: 'radio-1',
    listOption: [
      { label: 'radio1', key: 1 },
      { label: 'radio2', key: 2 },
    ],
    defaultValue: 2,
  },
}
