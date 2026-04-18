import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx'
import { Label } from './ui/label.tsx'
import { setSearchedQuery } from '../redux/jobSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FilterCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterData = [
    {
      type: "Location",
      options: ["Karachi", "Lahore", "Islamabad", "Hyderabad", "Rawalpindi"]
    },
    {
      type: "Job Type",
      options: ['Full Time', 'Part Time']
    },
    {
      type: "Mode",
      options: ['Remote', 'On-Site', 'Hybrid']
    },
    // {
    //   type: "Salary Range",
    //   options: ['0-50k', '50k-100k', '100k-150k', '150k-200k',]
    // },
    // {
    //   type: "Experience",
    //   options: ['0-2yrs', '2yrs-4yrs', '4yrs-6yrs']
    // }
  ]


  const filterHandler = (e) => {
    dispatch(setSearchedQuery(e.target.value.toLowerCase()));
    navigate('/browse');
  };

  return (
   
      <RadioGroup className='md:w-[10%] pl-2 h-[calc(100svh-50px)] overflow-y-scroll'>{
        
        filterData.map((item, index)=>
          <div key={index} className='h-fit rounded-md '>
            <h1 className='font-bold text-sm'>{item.type}</h1>
            {
            item.options.map((option, ind)=>(
              <div key={ind} className='flex gap-2 py-1'>
                <RadioGroupItem id={option} value={option} onClick={filterHandler} className='size-3 bg-gray-300 '/>
                <Label htmlFor={option}>{option}</Label>

              </div>

            ))
          }
          </div>
      )
        }

      </RadioGroup>

  )
}

export default FilterCard
