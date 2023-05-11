import React from 'react'

const CardTask = () => {
  return (
    <div className="border border-gray-200 m-4 rounded cursor-pointer">
      <div className="ml-4 flex py-4 items-center gap-2">
        {/* {reimburse.processInstaceLabel === 'Reimbursment' ? (
            <div className='p-2 bg-[#17BCB4] rounded'>
              <ReimburseIcons />
            </div>
          ) : reimburse.processInstaceLabe === 'Leave' ? (
            <div className='p-2 bg-[#17BCB4] rounded'>
              <LeaveIcons />
            </div>
          ) : (
            ''
          )} */}

        <span>
          {/* {reimburse.processInstaceLabel} */}
          label
        </span>
        <small className="ml-auto mr-4 bg-[#E4E6EF] px-4 py-1 rounded-lg font-bold" style={{ color: '#9056FC' }}>
          {/* {getTaskState(reimburse.tasks)} */}
          tasks
        </small>
      </div>
      <hr className="m-0 p-0" />
      <div className="flex py-4 ml-4 items-center">
        <div className="flex flex-col">
          <span className="font-bold">task name</span>
          <span>text</span>
        </div>
        <span className="ml-auto mr-4" style={{ fontSize: '8px', color: '#9e9e9e' }}>
          date
        </span>
      </div>
    </div>
  )
}

export default CardTask
