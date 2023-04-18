import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from '@/components/ui'

const meta = {
  title: 'Components/Input',
  component: Input,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const onChange: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <>
        <Input onChange={(e) => setValue(e.target.value)} />
        {value}
      </>
    )
  },
}
