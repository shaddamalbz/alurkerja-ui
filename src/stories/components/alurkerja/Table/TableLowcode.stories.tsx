import type { Meta, StoryObj } from '@storybook/react'
import { TableLowcode } from '@/components/alurkerja'

const meta = {
  title: 'Components/Alurkerja/TableLowcode',
  component: TableLowcode,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TableLowcode>

export default meta
type Story = StoryObj<typeof TableLowcode>

export const Default: Story = {
  args: {
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'jpn',
  },
  render: (args) => {
    return <TableLowcode {...args} />
  },
}
