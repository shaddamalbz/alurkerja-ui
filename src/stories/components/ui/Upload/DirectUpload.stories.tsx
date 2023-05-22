import type { Meta, StoryObj } from '@storybook/react'
import { DirectUpload } from '@/components/ui'

const meta = {
  title: 'Components/Upload/DirectUpload',
  component: DirectUpload,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DirectUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    baseUrl: 'https://api.dignas.space/',
    service: 'crud/media',
  },
  render: (args) => (
    <>
      <DirectUpload {...args} onSuccess={(res) => console.log(res)} />
      <span className="text-sm">note: check console & network when upload</span>
    </>
  ),
}
