import React, { use, useEffect } from 'react'
import JobCards from './JobCards.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';
const Browse = () => {
   
    useGetAllJobs();
    const {allSearchJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
 
// useEffect(()=>{},[allSearchJobs])

  return (
    <div className='max-w-7xl mx-auto my-10 px-3'>
            <h1 className='font-bold text-xl mb-3 md:my-10'>Search Results: {allSearchJobs.length}</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>{
                allSearchJobs?.map((job,index)=>(
                    <JobCards key={index+1} job={job}/>
                ))
                }

            </div>
        
      
    </div>
  )
}

export default Browse
