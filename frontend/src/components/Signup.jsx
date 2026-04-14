import React, { useEffect, useState } from 'react'
import { Label } from './ui/label.jsx'
import { Input } from './ui/input.jsx'
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx'
import { Button } from './ui/button.jsx'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading , setUser} from '@/redux/userSlice.js'

const Signup = () => {

    const {loading,user} = useSelector(store=>store.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
   const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    file: null
   }) 

   const changeHandler = (e)=>{
   if (e.target.files?.[0]) {
    
    setSignupData((prev)=>({...prev, file: e.target.files?.[0]}))
    return;
   }
    setSignupData((prev)=>({...prev, [e.target.name]: e.target.value}))
   }



   const submitHandler= async(e)=>{
    e.preventDefault()

    const formData = new FormData()
    formData.append("fullName", signupData.fullName)
    formData.append("email", signupData.email)
    formData.append("password", signupData.password)
    formData.append("phoneNumber", signupData.phoneNumber)
    formData.append("role", signupData.role)
    if (signupData){
          formData.append("file", signupData.file)
    }
   
try {
    dispatch(setLoading(true))
   const result = await axios.post(`${import.meta.env.VITE_USER_URL}/signup`, formData , {   
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    }
   )



   if (result.data.success) {
    dispatch(setUser(result?.data?.user))
    navigate('/')
    toast.success('Account Created')
   }
} catch (error) {
    // console.log(error)
    toast.error(error.response.data.message)
}
finally{
    dispatch(setLoading(false))
}
   }

   useEffect(()=>{
    if (user) navigate('/')
   }, [])


  return (
    <div className='flex justify-center items-center mx-auto max-w-5xl h-[calc(100svh-60px)'>
      <form className=' flex flex-col gap-4 w-1/2 p-6 border rounded-2xl'>
              
              <div className='flex flex-col gap-2' >
                  <Label>Full Name</Label>
                  <Input type='text' placeholder='John Peter' name='fullName'value={signupData.fullName} onChange={changeHandler}/>
              </div>

                <div className='flex flex-col gap-2' >
                  <Label>Email</Label>
                  <Input type='email' placeholder='xyz@domain.com' name='email'value={signupData.email} onChange={changeHandler}/>
              </div>

              <div className='flex flex-col gap-2' >
                  <Label>Password</Label>
                  <Input type='password' placeholder='*******' name='password' value={signupData.password} onChange={changeHandler} />
              </div>

              <div className='flex flex-col gap-2' >
                  <Label>Phone Number</Label>
                  <Input type='number' placeholder='' name='phoneNumber' value={signupData.phoneNumber} onChange={changeHandler} />
              </div>

              <div className='flex flex-col gap-2' >
                  <Label>Upload Profile Image</Label>
                  <Input type='file' accept="image/*" name='file' onChange={changeHandler} />
              </div>

              <div className='flex gap-2' >
                  <p className='font-medium text-sm'>Role: </p>
                  <div className='flex gap-3'>
                      <div className="flex space-x-2">
                          <input type='radio' name='role' value="Job Seeker" checked={signupData.role === "Job Seeker"} id="option-one" onChange={changeHandler}/>
                          <Label htmlFor="option-one">Job Seeker</Label>
                      </div>
                      <div className="flex  space-x-2">
                          <input type='radio' name='role' value="Recruiter" checked={signupData.role === "Recruiter"} id="option-two" onChange={changeHandler}/>
                          <Label htmlFor="option-two">Recruiter</Label>
                      </div>
                  </div>
              </div>

              {loading ? <Button className='w-full bg-emerald-950'><Loader2 className='animate-spin'>Please Wait</Loader2></Button>:<Button type='submit' className='w-full bg-emerald-700' onClick={submitHandler}>Signup</Button>}

               <span className='text-sm'>Already Have Account? <Link to='/login' className='text-blue-600'>Login</Link></span> 



      </form>

    </div>
  )
}

export default Signup
