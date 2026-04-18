
import './App.css'

import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import JobDescription from './components/JobDescription.jsx'
import Companies from './components/admin/Companies.jsx'
import CompanyCreate from './components/admin/CompanyCreate.jsx'
import CompanySetup from './components/admin/CompanySetup.jsx'
import AdminJobs from './components/admin/AdminJobs.jsx'
import PostJob from './components/admin/PostJob.jsx'
import Applicants from './components/admin/Applicants.jsx'
import AppliedJobTable from './components/AppliedJobTable.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/jobs' element={<Jobs />} />      {/* user should be redirected to login if not logged in and tries to access jobs page */}
          <Route path='/browse' element={<Browse />} />
          <Route path='/my-jobs' element={<AppliedJobTable />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
          <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
          <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          <Route path='/admin/jobs/create' element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path='/admin/jobs/applicants/:id' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
          <Route path='/admin/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} /> 
        </Route>

        <Route path='/description/:id' element={<JobDescription />} />

      </Routes>


    </>
  )
}

export default App
