import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
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

export const customPrefix: Story = {
  args: {
    prefix: <FaFacebook />,
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const Number: Story = {
  args: {
    type: 'number',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const TextArea: Story = {
  args: {
    type: 'text',
    textArea: true,
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const Email: Story = {
  args: {
    type: 'email',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const Password: Story = {
  args: {
    type: 'password',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const Date: Story = {
  args: {
    type: 'date',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const DatetimeLocal: Story = {
  args: {
    type: 'datetime-local',
  },
  render: (args) => {
    return <Input {...args} />
  },
}
