import type { Meta, StoryObj } from '@storybook/react'
import { Button, Dropdown } from '@/components/ui'
import { FaAd } from 'react-icons/fa'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    triggerElement: <Button>Dropdown</Button>,
    content: <>ini content</>,
  },
  render: (args) => {
    return <Dropdown {...args} />
  },
}
