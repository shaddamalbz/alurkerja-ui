import type { Meta, StoryObj } from '@storybook/react'
import { useFormSpec } from '@/hooks'

const meta = {
  title: 'Hooks/useFormSpec',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof useFormSpec>

export default meta
type Story = StoryObj<typeof useFormSpec>

export const Default: Story = {
  render: () => {
    const { createSpec, editSpec, fieldList, loading } = useFormSpec({
      baseUrl: 'https://kpm-sys.merapi.javan.id',
      tableName: 'jpn',
    })
    return (
      <div className="space-y-4">
        <p>baseUrl: https://lowcode.merapi.javan.id/</p>
        <p>tableName: kategori</p>
        {!loading ? (
          <>
            <p>createSpec: {JSON.stringify(createSpec)}</p>
            <p>editSpec: {JSON.stringify(editSpec)}</p>
            <p>fieldList: {JSON.stringify(fieldList)}</p>
          </>
        ) : (
          'loading..'
        )}
      </div>
    )
  },
}
