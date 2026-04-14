import React from 'react'
import { Input } from '../ui/input.jsx';
import { Button } from '../ui/button.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompaniesTable from './CompaniesTable.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSearchCompanyByText } from '@/redux/companySlice.js';
import useGetAllCompanies from '../../hooks/useGetAllCompanies.jsx';

const Companies = () => {

   useGetAllCompanies();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);

  return (
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="text-black w-fit"
                        placeholder="Search Company Name..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="bg-[#e76610] hover:bg-[#7a3304]" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
  )
}

export default Companies;
