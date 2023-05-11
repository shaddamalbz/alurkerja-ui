import type { Meta, StoryObj } from '@storybook/react'
import Task from '@/features/Task'

const meta = {
  title: 'Features/Task (BPMN)',
  component: Task,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Task>

export default meta
type Story = StoryObj<typeof Task>

export const Default: Story = {
  args: {},
}
