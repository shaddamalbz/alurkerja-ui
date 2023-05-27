import type { Meta, StoryObj } from '@storybook/react'
import { TableLowcode } from '@/features/Crud'
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
    baseUrl: 'https://api-geekacademy.merapi.javan.id',
    tableName: 'cuti',
    module: 'bpmn',
    // baseUrl: 'https://kpm-sys.merapi.javan.id',
    // tableName: 'mesyuarat',
    onClickCreate: undefined,
    onClickEdit: undefined,
    onClickDetail: undefined,
    onClickDelete: undefined,
    layout: 'fixed',
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
    onClickDetail: undefined,
    onClickDelete: undefined,
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
    onClickDetail: undefined,
    onClickDelete: undefined,
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

export const CustomAction: Story = {
  args: {
    baseUrl: 'https://api-geekacademy.merapi.javan.id',
    tableName: 'category',
    module: 'category',
    onClickCreate: () => console.log('create clicked'),
    onClickEdit: (spec, id) => console.log(`edit button on row with id ${id} clicked`, spec),
    onClickDelete: (spec, id) => console.log(`delete button on row with id ${id} clicked`, spec),
    onClickDetail: (id) => console.log(`delete button on row with id ${id} clicked`),
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

export const CustomAlertMessage: Story = {
  args: {
    baseUrl: 'https://api-geekacademy.merapi.javan.id',
    tableName: 'category',
    module: 'category',
    onClickCreate: undefined,
    onClickEdit: undefined,
    onClickDelete: undefined,
    onClickDetail: undefined,
    onDeleteConfirm: undefined,
    message: {
      success_create_text: 'Custom text create',
      success_create_title: 'Custom title create',
      success_delete_title: 'Custom tile delete',
      success_delete_text: 'Custom text delete',
      success_edit_text: 'Custom text edit',
      success_edit_title: 'Custom title edit',
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
