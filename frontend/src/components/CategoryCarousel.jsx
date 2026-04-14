import React from 'react'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel.jsx';
import { Button } from './ui/button.jsx';
const carousel = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Mobile Developer",
    "Data Science",
    "Graphic Designer",
    ".Net Developer",
    "C++ Developer"
]

const CategoryCarousel = () => {
  return (

  <Carousel className='w-40 mx-auto px-2'>
        <CarouselContent >
        {carousel.map((category, index) => (
          <CarouselItem key={index} >
            <Button className='rounded-full bg-[#e76610] w-full hover:bg-[#7a3304]'>

            {category}
            </Button>
         
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
  </Carousel>
  )
}

export default CategoryCarousel
