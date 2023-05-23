import type { Meta, StoryObj } from '@storybook/react'
import { DateRange } from '@/components/ui'

const meta = {
  title: 'Components/DateRange',
  component: DateRange,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DateRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const OnChange: Story = {
  args: { onChange: (value) => console.log(value) },
}

export const CustomText: Story = {
  args: { text: '-' },
}
