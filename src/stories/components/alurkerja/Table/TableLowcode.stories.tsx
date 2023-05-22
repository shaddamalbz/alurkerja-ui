import type { Meta, StoryObj } from '@storybook/react'
import { TableLowcode } from '@/components/alurkerja'
import { useState } from 'react'

const meta = {
  title: 'Features/TableLowcode',
  component: TableLowcode,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TableLowcode>

export default meta
type Story = StoryObj<typeof TableLowcode>

export const Base: Story = {
  args: {
    // baseUrl: 'https://api-geekacademy.merapi.javan.id',
    // tableName: 'article',
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'lkp-kadar',
    onClickCreate: undefined,
    onClickEdit: undefined,
    // module: 'article',
  },
  render: (args) => {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const [renderState, setRenderState] = useState(0)
    const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
    const [search, setSearch] = useState<string>()

    return (
      <TableLowcode
        {...args}
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
      />
    )
  },
}

export const CustomHeader: Story = {
  args: {
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'jpn',
    onClickCreate: undefined,
    onClickEdit: undefined,
    headerElement: <>Custom</>,
  },
  render: (args) => {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const [renderState, setRenderState] = useState(0)
    const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
    const [search, setSearch] = useState<string>()

    return (
      <TableLowcode
        {...args}
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
      />
    )
  },
}

export const CustomTitle: Story = {
  args: {
    baseUrl: 'https://api-geekacademy.merapi.javan.id',
    tableName: 'category',
    module: 'category',
    onClickCreate: undefined,
    onClickEdit: undefined,
    title: 'Custom Title',
  },
  render: (args) => {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const [renderState, setRenderState] = useState(0)
    const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
    const [search, setSearch] = useState<string>()

    return (
      <TableLowcode
        {...args}
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
      />
    )
  },
}

export const HasRelation: Story = {
  args: {
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'ad-kat-pcg-mp',
    onClickCreate: undefined,
    onClickEdit: undefined,
  },
  render: (args) => {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const [renderState, setRenderState] = useState(0)
    const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
    const [search, setSearch] = useState<string>()

    return (
      <TableLowcode
        {...args}
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
      />
    )
  },
}

export const CustomFilterField: Story = {
  args: {
    baseUrl: 'https://kpm-sys.merapi.javan.id',
    tableName: 'jpn',
    onClickCreate: undefined,
    onClickEdit: undefined,
    customFilterField: ({ field, defaultField }) => {
      const [name, spec] = field

      if (name === 'nama') {
        return <div>Custom</div>
      }
      return defaultField
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
        const [renderState, setRenderState] = useState(0)
        const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
        const [search, setSearch] = useState<string>()

        <TableLowcode 
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
        />`,
      },
    },
  },
  render: (args) => {
    const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
    const [renderState, setRenderState] = useState(0)
    const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
    const [search, setSearch] = useState<string>()

    return (
      <TableLowcode
        {...args}
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
      />
    )
  },
}
