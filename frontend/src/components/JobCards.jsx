import React from 'react'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'

import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar.jsx'
import { useNavigate } from 'react-router-dom'

const JobCards = ({ job }) => {
  

  const navigate = useNavigate()

  const daysAgo = (date) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffTime = Math.abs(now - jobDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return Math.floor(diffDays) ? Math.floor(diffDays) + ' days ago' : 'Today';
  }

  return (
    <div className='p-2 md:p-5 shadow-2xl rounded-md bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt)}</p>
            <Button className='rounded-full' variant='outline' size='icon'><Bookmark/></Button>
        </div>

        <div className='flex gap-2 my-2'>
           <Button variant='outline' size='icon'>
           <Avatar>
            <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEHW0BIxPzQhJdRdRbpr7w6aKZQ_NZtd_LbA&s'/>
            </Avatar> 
            </Button>

        <div>
          <h1 className='font-medium text-sm'>{job?.companyId?.companyName}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
        </div>
      
              <div>
                <h1 className='font-medium text-lg my-2 h-[25px] overflow-hidden'>{job?.title}</h1>
                <p className='text-sm text-gray-600 h-[60px] overflow-hidden'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
                <Badge className={'text-[#e76610] font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#e76610] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#e76610] font-bold'} variant="ghost">{job?.salary}</Badge>
            </div>
            <div className='flex justify-between gap-4 mt-2'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button variant="outline">Save For Later</Button>
            </div>
    </div>
  )
}

export default JobCards
