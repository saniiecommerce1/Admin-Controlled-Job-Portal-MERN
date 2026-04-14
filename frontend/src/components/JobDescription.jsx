import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setSingleJob } from '../redux/jobSlice.js'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const JobDescription = () => {
    const params = useParams()
    const { id } = params
    const dispatch = useDispatch()
    const {user } = useSelector(store=>store.user)
    // const {singleJob } = useSelector(store=>store.job)
    // const initialIsApplied = singleJob?.applicationIds.some(application=>application.userId==user?._id)
    const [isApplied, setIsApplied] = useState(false) //not false because user can apply and then we need to update the button state without refreshing the page and no flickering on UI when caomeback again due t redux persist.
    const [singleJob, setSingleJob] = useState(null);


 


 const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APPLICATION_URL}/apply-jobs/${id}`, {withCredentials:true});
            
            if(res.data.success){            
                setIsApplied(true);
                setSingleJob({...singleJob, applicationIds: [...singleJob.applicationIds, {_id:'tempId', userId: user._id}] }); //optimistic update to avoid refetching the job details after applying and also to avoid flickering on UI due to refetching.
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

       useEffect(()=>{  
        const fetchSingleJob = async () => {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_JOB_URL}/job/${id}`,{withCredentials:true});
                    if(res.data.success){                   
                        setSingleJob(res.data.job);
                        setIsApplied(res.data.job.applicationIds.some(application=>application.userId==user?._id));
                    }
                } catch (error) {
                    console.log(error);
                }
            }         
            fetchSingleJob();
        },[])

    if (!singleJob) {
        return (<Loader2 className="animate-spin m-auto">Loading..</Loader2>)}
            
            
    return (
        <div className='max-w-7xl mx-auto my-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Title</h1>
                    <div className='flex gap-2 mt-4'>
                        <Badge className={'text-[#e76610] font-bold'} variant="ghost">{singleJob?.position}  Positions</Badge>
                        <Badge className={'text-[#e76610] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#e76610] font-bold'} variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button disabled={isApplied} className={`rounded-lg ${isApplied ? 'cursor-not-allowed' : 'bg-[#e76610] hover:bg-[#7a3304]'}`} onClick={isApplied? null :() => applyJobHandler()}>
                    {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applicationIds.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split('T')[0]}</span></h1>

            </div>
        </div>
    )
}

export default JobDescription
