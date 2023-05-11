import React, { FC } from 'react'
import { Tab } from '@headlessui/react'

import CardTask from './components/CardTask'

const Task: FC = () => {
  return (
    <div className="bg-white rounded-lg">
      <h1 className="py-7 px-9 font-bold uppercase border-b-2 border-gray-200">My Task</h1>
      <div className="flex gap-y-4 flex-wrap md:flex-nowrap">
        <div className="basis-full lg:basis-1/3 border-r-2 border-gray-200">
          <div className="border-b-2 border-gray-200">
            <div className="p-5">
              <select className="w-full bg-gray-100 text-gray-400 p-2 rounded">
                <option disabled>All Process</option>
                <option value="leave">Leave</option>
                <option value="reimbursment">Reimburse</option>
              </select>
            </div>
          </div>
          {/* Card Container */}
          <div>
            <CardTask />
          </div>
        </div>
        <div className="basis-full lg:basis-2/3 flex flex-col gap-4 ">
          <div className="min-h-[485px] p-7">tes</div>
          <Tab.Group>
            <Tab.List className="flex items-center gap-x-10 border-y px-8">
              <Tab className="px-2.5 py-4 hover:border-b hover:border-b-[#0095E8] hover:text-[#0095E8]">Tab 1</Tab>
              <Tab className="px-2.5 py-4 hover:border-b hover:border-b-[#0095E8] hover:text-[#0095E8]">Tab 2</Tab>
              <Tab className="px-2.5 py-4 hover:border-b hover:border-b-[#0095E8] hover:text-[#0095E8]">Tab 3</Tab>
            </Tab.List>

            <Tab.Panels className="px-8 pb-14 pt-8">
              <Tab.Panel>Content 1</Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

export default Task
