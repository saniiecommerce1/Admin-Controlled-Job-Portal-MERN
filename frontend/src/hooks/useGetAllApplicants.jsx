import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllApplicants = (id) => {

    const dispatch = useDispatch();

    useEffect(()=>{
       const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APPLICATION_URL}/recruiter/applicants/${id}`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
                console.log(res.data.job)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    },[id])
}

export default useGetAllApplicants