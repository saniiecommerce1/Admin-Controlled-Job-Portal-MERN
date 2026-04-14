import React from 'react'
import FilterCard from './FilterCard.jsx'
import JobCards from './JobCards.jsx'
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';

const Jobs = () => {

    
    const {allJobs} = useSelector(store=>store.job);


  return (
    <div className='max-w-7xl mx-auto mt-5 flex gap-2 h-[calc(100svh-50px)]'>
      <FilterCard />
   
        {
            allJobs.length ===0 ?<div>No Jobs Available</div> :
            <div className='flex-1 overflow-y-scroll'>
            <div className='grid grid-cols-3 gap-5 '>
         {   allJobs.map((job)=>(
                  <JobCards job={job} key={job._id}/>
                ))
            }
            </div>
            </div>
   
        }
     
      
  
    </div>
  )
}

export default Jobs
