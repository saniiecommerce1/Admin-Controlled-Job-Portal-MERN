import React from 'react'
import JobCards from './LatestJobCards.jsx'
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    // const jobsList=  [1,2,3,4,5,6,7,8]
    const {allJobs} = useSelector(store=>store.job);
  
  return (
    <div className='max-w-7xl mx-3 md:mx-auto mt-9 mb-3 md:my-9'>
      <h1 className='font-bold text-2xl'>Latest Job Openings</h1>
      <div className='grid md:grid-cols-3 gap-1 md:gap-2.5'>        
            {allJobs == 0 ? <span>No Jobs Available</span> : allJobs?.slice(0,6).map((job, index)=>
            <JobCards key={index} job={job}/>
            )
            }
      </div>
    </div>
  )
}

export default LatestJobs
