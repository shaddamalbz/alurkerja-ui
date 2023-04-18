import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (args) => {
    return (
      <div className="h-16 my-auto flex items-center mx-4">
        <Badge content={1}>
          <button className="h-10 w-10 rounded-full bg-gray-200" />
        </Badge>
      </div>
    )
  },
}

export const StringContent: Story = {
  render: (args) => {
    return (
      <div className="h-16 my-auto flex items-center mx-4">
        <Badge content={'A+'}>
          <button className="h-10 w-10 rounded-full bg-gray-200" />
        </Badge>
      </div>
    )
  },
}

export const OverContent: Story = {
  render: (args) => {
    return (
      <div className="h-16 my-auto flex items-center mx-4">
        <Badge content={3} maxCount={2}>
          <button className="h-10 w-10 rounded-full bg-gray-200" />
        </Badge>
      </div>
    )
  },
}
