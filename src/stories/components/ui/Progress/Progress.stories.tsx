import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@/components/ui'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: (args) => {
    return (
      <section className="space-y-4 mx-4">
        <div>
          <h1>Line</h1>
          <Progress percent={30} />
        </div>
        <div className="flex gap-2">
          <h1>Circle</h1>
          <Progress variant="circle" percent={40} />
          <Progress variant="circle" percent={70} gapDegree={70} gapPosition="bottom" />
        </div>
        <div className="space-y-2">
          <h1>Color</h1>
          <Progress color="red-500" percent={20} className="mb-4" />
          <Progress color="green-500" percent={30} className="mb-4" />
        </div>
        <div className="space-y-2">
          <h1>Size</h1>
          <div className="flex items-center">
            <Progress className="mx-6" size="sm" percent={60} />
            <Progress variant="circle" percent={40} width={80} />
          </div>
        </div>
      </section>
    )
  },
}
