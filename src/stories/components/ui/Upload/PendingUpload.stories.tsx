import type { Meta, StoryObj } from '@storybook/react'
import { PendingUpload } from '@/components/ui'

const meta = {
  title: 'Components/Upload/PendingUpload',
  component: PendingUpload,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PendingUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Image: Story = {
  args: { type: 'image' },
}

export const Multiple: Story = {
  args: { multiple: true },
}

export const OnChange: Story = {
  args: {},
  render: () => {
    return (
      <>
        <PendingUpload
          onChange={(file) => {
            console.log(file)
          }}
        />
        <p className="text-sm">note: check console when upload</p>
      </>
    )
  },
}

export const AsFile: Story = {
  args: {},
  render: () => {
    return (
      <>
        <PendingUpload
          onChange={(file) => {
            console.log(file)
          }}
          asFile
        />
        <p className="text-sm">note: check console when upload</p>
      </>
    )
  },
}
