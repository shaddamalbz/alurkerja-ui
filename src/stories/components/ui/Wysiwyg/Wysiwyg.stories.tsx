import type { Meta, StoryObj } from '@storybook/react'
import { Wysiwyg } from '@/components/ui'

const meta = {
  title: 'Components/Wysiwyg',
  component: Wysiwyg,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Wysiwyg>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: { onChange: (value) => console.log(value) },
}

export const DefaultValue: Story = {
  args: {
    defaultValue: '<p><em>asdasd</em><strong>asdasd</strong></p>',
  },
}
