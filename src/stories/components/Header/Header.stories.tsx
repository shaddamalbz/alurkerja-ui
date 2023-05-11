import type { Meta, StoryObj } from '@storybook/react'
import Header from '@/components/Header'
import { Avatar } from '@/components/ui'

const meta = {
  title: 'Components/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: { onClickAvatar: undefined, onClickNotification: undefined },
}

export const OnClickAvatar: Story = {
  args: { onClickAvatar: () => console.log('avatar cliced'), onClickNotification: undefined },
  render: (args) => (
    <>
      <Header {...args} />
      check console
    </>
  ),
}

export const onClickNotification: Story = {
  args: { onClickNotification: () => console.log('avatar cliced'), onClickAvatar: undefined },
  render: (args) => (
    <>
      <Header {...args} />
      check console
    </>
  ),
}
