import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@/components/ui'
import { FaUserAlt } from 'react-icons/fa'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (args) => {
    return <Avatar {...args} className="border-2 border-white" icon={<FaUserAlt />} />
  },
}
