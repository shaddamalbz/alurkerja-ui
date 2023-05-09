import type { Meta, StoryObj } from '@storybook/react'
import { Button, Dropdown } from '@/components/ui'
import { FaAd } from 'react-icons/fa'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    triggerElement: <Button>Dropdown</Button>,
    menu: [
      { label: 'Menu1', href: '/menu1', icon: <FaAd /> },
      { label: 'Menu2', href: '/menu2', icon: <FaAd /> },
    ],
  },
  render: (args) => {
    return <Dropdown {...args} />
  },
}

export const CustomAction: Story = {
  args: {
    triggerElement: <Button>Dropdown</Button>,
    menu: [
      { label: 'Menu1', href: '/menu1', icon: <FaAd />, onClick: () => console.log('clicked') },
      { label: 'Menu2', href: '/menu2', icon: <FaAd />, onClick: () => console.log('clicked') },
    ],
  },
  render: (args) => {
    return <Dropdown {...args} />
  },
}
