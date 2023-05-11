import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from '@/components/Sidebar'
import { FaAd } from 'react-icons/fa'
import { useState } from 'react'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    menuConfig: [
      { label: 'Menu1', href: '/menu1', icon: <FaAd /> },
      {
        label: 'Menu2',
        href: '/menu2',
        icon: <FaAd />,
        child: [{ href: '/child1', label: 'Child1', child: [{ href: '/grandchild', label: 'Grandchild' }] }],
      },
    ],
  },
  render: (args) => {
    const [toogled, setToggled] = useState(false)

    return <Sidebar toggled={toogled} setToggled={setToggled} menuConfig={args.menuConfig} />
  },
}
