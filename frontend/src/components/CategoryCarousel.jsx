import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel.jsx';
import { Button } from './ui/button.jsx';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';
import { useNavigate } from 'react-router-dom';
const carousel = [
    "Frontend",
    "Backend ",
    "FullStack ",
    "Flutter",
    "Data Science",
    "HR",
    "Graphic Designer",
    ".Net ",
    "C++ ",
    "C#"
]

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carouselHandler = (e)=>{
    const category = e.target.innerText.toLowerCase();
    
    dispatch(setSearchedQuery(category));
    navigate('/browse');

  }
  return (

  <Carousel className='w-1/2 mx-auto px-2 mt-2'>        
      <CarouselContent>
        {
          carousel.map((category, index) => (
          <CarouselItem key={index}  className='flex justify-between'>
            <Button className='rounded-full bg-[#e76610] w-[45%] md:w-1/3 hover:bg-[#7a3304] ' onClick={carouselHandler}>
            {category}
            </Button>    
            <Button className='rounded-full bg-[#e76610] w-[45%] md:w-1/3 hover:bg-[#7a3304]' onClick={carouselHandler}>
            {carousel[index+1 < carousel.length ? index+1 : 0]}
            </Button> 
         
          </CarouselItem>
        ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
  </Carousel>
  )
}

export default CategoryCarousel
