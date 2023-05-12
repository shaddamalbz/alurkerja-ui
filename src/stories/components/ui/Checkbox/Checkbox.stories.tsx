import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@/components/ui'
import { useState } from 'react'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    listOption: [
      { name: 'option1', label: 'option 1', value: 1 },
      { name: 'option2', label: 'option 2', value: 2 },
    ],
    onChange: (value) => console.log(value),
  },
  render: (args) => {
    const [obj, setObj] = useState<any>()
    return (
      <>
        <Checkbox {...args} onChange={(value) => setObj(value)} />
        value: {JSON.stringify(obj)}
      </>
    )
  },
}
