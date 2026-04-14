import React, { useState } from 'react'
import { Button } from './ui/button.jsx'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice.js'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [search, setSearch] =useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = ()=>{
        dispatch(setSearchedQuery(search));
        navigate('/browse');
    }


  return (
    <div className='flex flex-col text-center  gap-5 my-10'>
      <span className='text-sm font-medium bg-gray-300 mx-auto py-2 px-4 rounded-full'>Best Job Getting Website</span>
    <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#e76610]'>Dream Jobs</span></h1>
    <div className='flex my-4 rounded-full justify-center h-10'>
        <input className='rounded-l-full bg-gray-300 pl-5 focus:outline-none w-1/2' type='search' onChange={(e)=>setSearch(e.target.value)} name='search' value={search}/>
        <Button onClick={handleSearch} className='rounded-r-full bg-[#e76610] hover:bg-[#7a3304] h-10'><Search ></Search></Button>
    </div>
    </div>
  )
}

export default HeroSection
