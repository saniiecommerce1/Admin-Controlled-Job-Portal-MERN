import React from 'react'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './Footer.jsx'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const Home = () => {

  useGetAllJobs();
  
  const user = useSelector(store => store.user.user);


  if (user?.role === "Recruiter") {
    return <Navigate to="/admin/companies" />;
  }
  
  return (
    <div>
     <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
