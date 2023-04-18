import type { Meta, StoryObj } from '@storybook/react'
import { CloseButton } from '@/components/ui'

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CloseButton>

export default meta
type Story = StoryObj<typeof CloseButton>

export const Default: Story = {
  render: (args) => {
    return <CloseButton />
  },
}
