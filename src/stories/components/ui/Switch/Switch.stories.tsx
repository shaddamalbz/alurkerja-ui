import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    options: [{ label: 'Ya', value: true },
    { label: 'Tidak',  value: false}],
    onChange:(value) => console.log(value)
  },
}




