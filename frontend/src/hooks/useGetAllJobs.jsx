import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllSearchJobs, setSearchedQuery } from '../redux/jobSlice.js'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_JOB_URL}/all?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                     if (searchedQuery) {
                    dispatch(setAllSearchJobs(res.data.job));
                    dispatch(setSearchedQuery(''));
                    }
                    if (!searchedQuery) dispatch(setAllJobs(res.data.job));
                   
                }
            } catch (error) {  //when no Search Job found otherwise show previous search result job list
                dispatch(setAllSearchJobs([]));
                dispatch(setSearchedQuery(""));
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs;