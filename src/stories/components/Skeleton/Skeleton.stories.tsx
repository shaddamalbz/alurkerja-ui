import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '@/components/ui'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ width: '100px', margin: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Skeleton variant="block" />
        <Skeleton variant="circle" />
      </div>
    )
  },
}
