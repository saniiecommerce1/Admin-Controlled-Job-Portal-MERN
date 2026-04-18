import React, { useState } from 'react'
import { Label } from './ui/label.jsx'
import { Input } from './ui/input.jsx'
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx'
import { Button } from './ui/button.jsx'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/userSlice.js'

const Login = () => {


    const {loading,user} = useSelector(store=>store.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: ''
  })

  const changeHandler = (e) => {

    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

   
    try {
     dispatch(setLoading(false))

    
      const result = await axios.post(`${import.meta.env.VITE_USER_URL}/login`, loginData, {
        headers: {'Content-Type': "application/json" },
        withCredentials: true,
      })

      if (result.data.success) {
        dispatch(setUser(result.data.user))
        navigate('/')
        toast.success('Account Created')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
    dispatch(setLoading(false))
    }
  }



  return (
    <div className='flex justify-center items-center max-w-5xl mx-auto h-[calc(100svh-100px)] md:h-[calc(100svh-60px)]
'>
      <form className=' flex flex-col gap-4 w-[85%] md:w-1/2 p-6 border rounded-2xl'>


        <div className='flex flex-col gap-2' >
          <Label>Email</Label>
          <Input type='email' placeholder='xyz@domain.com' name='email' value={loginData.email} onChange={changeHandler} />
        </div>

        <div className='flex flex-col gap-2' >
          <Label>Password</Label>
          <Input type='password' placeholder='*******' name='password' value={loginData.password} onChange={changeHandler} />
        </div>

        <div className='flex gap-2' >
          <p className='font-medium text-sm'>Role: </p>
          <div className='flex gap-3'>
            <div className="flex space-x-2">
              <input type='radio' name='role' value="Job Seeker" checked={loginData.role === "Job Seeker"} id="option-one" onChange={changeHandler} />
              <Label htmlFor="option-one">Job Seeker</Label>
            </div>
            <div className="flex  space-x-2">
              <input type='radio' name='role' value="Recruiter" checked={loginData.role === "Recruiter"} id="option-two" onChange={changeHandler} />
              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </div>
        </div>

        {loading ? <Button className='w-full bg-[#e76610] hover:bg-[#7a3304]'><Loader2 className='animate-spin'>Please Wait</Loader2></Button> : <Button type='submit' className='w-full bg-[#e76610] hover:bg-[#7a3304]' onClick={submitHandler}>Login</Button>}

        <span className='text-sm'>Dont Have Account? <Link to='/signup' className='text-blue-600'>Signup</Link></span>

      </form>

    </div>
  )
}

export default Login;

