import type { Meta, StoryObj } from '@storybook/react'
import { AlurkerjaTable } from '@/components/alurkerja'

const meta = {
  title: 'Components/Alurkerja/Table',
  component: AlurkerjaTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AlurkerjaTable>

export default meta
type Story = StoryObj<typeof AlurkerjaTable>

export const Default: Story = {
  render: (args) => {
    return (
      <AlurkerjaTable
        baseUrl="https://lowcode.merapi.javan.id"
        tableName="kategori"
        customCell={({ name, fields, value, defaultCell }) => {
          if (name === 'created_at') {
            return <td className="text-red-400 text-center">custom Cell</td>
          } else {
            return defaultCell
          }
        }}
      />
    )
  },
}
