import type { Meta, StoryObj } from '@storybook/react'
import { Modal, Button } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: (args) => {
    return (
      <Modal title="Modal" triggerButton={<Button>Open</Button>}>
        <div>Content</div>
      </Modal>
    )
  },
}
