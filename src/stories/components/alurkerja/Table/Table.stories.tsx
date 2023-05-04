import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '@/components/alurkerja'
import { ListSpec } from '@/types'

const meta = {
  title: 'Components/Alurkerja/Table',
  component: Table,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: (args) => {
    const spec: ListSpec = [{ name: 'course_name', type: 'text', label: 'Akademi' }]
    return <Table url="" spec={spec} />
  },
}
