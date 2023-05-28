import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '@/features/Crud'
import { ListSpec } from '@/types'
import { useState } from 'react'

const meta = {
  title: 'Features/Table',
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
  args: {
    url: 'https://api.dignas.space/crud/portfolio/v-public-index',
  },
  render: (args) => {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const spec: ListSpec = [{ name: 'course_name', type: 'text', label: 'Akademi' }]
    return <Table {...args} spec={spec} pageConfig={pageConfig} setPageConfig={setPageConfig} />
  },
}
