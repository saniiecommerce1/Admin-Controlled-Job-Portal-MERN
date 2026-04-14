import React, { useEffect } from 'react'

import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Loader2 } from 'lucide-react';
import useGetAllApplicants from '@/hooks/useGetAllApplicants';

const Applicants = () => {

    const params = useParams();
    useGetAllApplicants(params.id);
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

   

    if (!applicants) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (

        <div>
          
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applicationIds?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants