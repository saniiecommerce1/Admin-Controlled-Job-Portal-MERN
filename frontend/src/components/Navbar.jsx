import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.jsx'
import { Button } from './ui/button.jsx'
import { Avatar, AvatarImage } from './ui/avatar.jsx'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { resetUser } from '../redux/userSlice.js'
import { resetJob } from '../redux/jobSlice.js'
import { resetCompany } from '../redux/companySlice.js'
import { resetApplication } from '../redux/applicationSlice.js'

const Navbar = () => {

    const { loading, user } = useSelector(store => store.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await axios.post(`${import.meta.env.VITE_USER_URL}/logout`, {}, { withCredentials: true })
        dispatch(resetUser());
        dispatch(resetJob());
        dispatch(resetCompany());
        dispatch(resetApplication());
        navigate('/login')
    }

    return (
        <>
            <div className='bg-white flex justify-between mx-auto h-[60px] max-w-7xl'>
                <div className='mt-3.5'>
                    <h1 className='text-2xl text-[#e76610] font-bold'>Job<span className='text-[#7a3304]'>Seeker.com</span></h1>
                </div>
                <div className='flex gap-12'>
                    <ul className='flex font-medium gap-5 mt-3.5'>
                        { !user &&
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/login">Jobs</Link></li>
                            </>}
                        {user?.role === 'Job Seeker' &&
                            <>

                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>

                            </>}
                        {
                            user?.role === 'Recruiter' &&
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        }
                    </ul>
                    {
                        user ? (<div className='flex gap-2 justify-between'>
                            <Popover >
                                <PopoverTrigger>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profileImage || "https://github.com/shadcn.png"} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-5'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profileImage || "https://github.com/shadcn.png"} />
                                        </Avatar>
                                        <div>

                                            <h1 className='font-medium '>{user?.fullName}</h1>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.title}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3 mt-2 cursor-pointer'>
                                        {user?.role === 'Job Seeker' &&
                                            <div className='flex gap-2' >
                                                <User2 className='mt-2' />
                                                <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        }
                                        <div className='flex gap-2'>
                                            <LogOut className='mt-2' />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>

                                </PopoverContent>

                            </Popover>
                            {/* <Button onClick={logoutHandler} className='bg-[#e76610] hover:bg-[#7a3304] mt-2'><Link to="/">Logout</Link></Button>             */}
                        </div>) : (
                            <div className='flex gap-5 mt-3.5'>
                                <>
                                    <Button className='bg-[#e76610] hover:bg-[#7a3304]'><Link to="/login">Login</Link></Button>
                                    <Button className='bg-[#e76610] hover:bg-[#7a3304]'><Link to="/signup">Signup</Link></Button>
                                </>

                            </div>
                        )
                    }



                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar
