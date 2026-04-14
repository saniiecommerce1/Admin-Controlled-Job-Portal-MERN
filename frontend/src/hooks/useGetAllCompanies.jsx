import { setCompanies} from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
 
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                // dispatch(setCompanies([]));
                const res = await axios.get(`${import.meta.env.VITE_COMPANY_URL}/userId/all`,{withCredentials:true});
               
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies