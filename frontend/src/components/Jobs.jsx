import React, { useCallback, useEffect, useRef, useState } from 'react'
import FilterCard from './FilterCard.jsx'
import JobCards from './JobCards.jsx'
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {


 const { user } = useSelector(store => store.user);
 const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastJobRef = useCallback(node => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  const fetchJobs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_JOB_URL}/all?page=${page}&limit=6`
      );

      if (res.data.success) {
        setJobs(prev => [...prev, ...res.data.job]);

        // if no more data
        if (res.data.job.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    return () => {
      if (!user) navigate("/login");
    };
  }, [user]);


  return (
    <div className='max-w-7xl mx-auto mt-12 md:mt-5 flex gap-2 h-[calc(100svh-50px)]'>
      <FilterCard />

      {
        jobs.length === 0 ? <div>No Jobs Available</div> :
          <div className='flex-1 overflow-y-scroll'>
            <div className='grid md:grid-cols-3 gap-5 '>


              {jobs?.map((job, index) => {
                if (index === jobs?.length - 1) {
                  return (
                    <div ref={lastJobRef} key={index+123}>
                      <JobCards job={job} />
                    </div>
                  );
                }

                return <JobCards key={index+123} job={job} />;
              })}

              {/* {   allJobs.map((job)=>(
                  <JobCards job={job} key={job._id}/>
                ))
            } */}
            </div>
          </div>

      }



    </div>
  )
}

export default Jobs
