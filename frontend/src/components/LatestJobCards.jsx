import { Badge } from './ui/badge.jsx'
import React from 'react'

const LatestJobCards = ({job}) => {


  return (
    <div className='rounded-md shadow-lg bg-white border border-gray-100 cursor-pointer p-5 my-2 md:my-5'>
      <div>
        <h1 className='font-medium text-lg'>{job?.companyId?.companyName}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>
              <div>
                <h1 className='font-bold text-lg mt-2 h-[25px] overflow-hidden'>{job?.title}</h1>
                <p className='text-sm text-gray-600 h-40px overflow-hidden'>{job?.description}</p>
            </div>
            <div className='flex gap-6 mt-4'>
                <Badge className={'text-[#e76610] font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#e76610] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#e76610] font-bold'} variant="ghost">{job?.salary}</Badge>
            </div>
    </div>
  )
}

export default LatestJobCards
