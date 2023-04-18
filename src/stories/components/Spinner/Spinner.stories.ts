import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '@/components/ui'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 20 },
}
