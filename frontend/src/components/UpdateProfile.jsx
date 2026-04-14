import React, { useState } from 'react'
import axios from 'axios'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.jsx'
import { Label } from './ui/label.tsx'
import { Input } from './ui/input.jsx'
import { Button } from './ui/button.jsx'
import { Loader2, Pen } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice.js'
import { toast } from 'sonner'


const UpdateProfile = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)
    const [input, setInput] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        title: user?.profile?.title || '',
        skills: user?.profile?.skills || '',
        file: user?.profile?.resume || ''
    })

    const changeHandler = (e) => {

        if (e.target.files?.[0]) {
            setInput(prev => ({ ...prev, file: e.target.files?.[0] }))
            return;
        }
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName', input.fullName)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('title', input.title)
        formData.append('skills', input.skills)
        if (input.file) formData.append('file', input.file)
 
        try {
            setLoading(true)
            const result = await axios.put(`${import.meta.env.VITE_USER_URL}/update-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (result.data.user) {

                dispatch(setUser(result.data.user))
                toast.success(result.data.message)
                setOpen(false)
            }


        } catch (error) {

            toast.error(error?.response?.data?.message)
        }
        finally {
            setLoading(false)        
        }
    }
    return (
        <div>
            {open &&  <Dialog >
                <form>
                    <DialogTrigger asChild>
                        <Button className="text-right" variant='outline'><Pen /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" >
                        <DialogHeader>
                            <DialogTitle>Update Profile</DialogTitle>
                        </DialogHeader>
                        <div className='grid gap-4'>

                            <div className='grid grid-cols-4'>
                                <Label htmlFor='name'>Name</Label>
                                <Input type='text' id='name' name='fullName' className='col-span-3' value={input.fullName} onChange={changeHandler} />
                            </div>


                            <div className='grid grid-cols-4'>
                                <Label htmlFor='phoneNumber'>Phone Number</Label>
                                <Input type='text' id='phoneNumber' name='phoneNumber' className='col-span-3' value={input.phoneNumber} onChange={changeHandler} />
                            </div>

                            <div className='grid grid-cols-4'>
                                <Label htmlFor='title'>Title</Label>
                                <Input type='text' id='title' name='title' className='col-span-3' value={input?.title} onChange={changeHandler} />
                            </div>

                            <div className='grid  grid-cols-4'>
                                <Label htmlFor='skills'>Skills</Label>
                                <Input type='text' id='skills' name='skills' className='col-span-3' value={input?.skills} onChange={changeHandler} />
                            </div>


                            <div className='grid  grid-cols-4'>
                                <Label htmlFor='file'>Resume</Label>
                                <Input type='file' accept='application/pdf' id='file' name='file' className='col-span-3' onChange={changeHandler} />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? <Button className='w-full bg-emerald-950'><Loader2 className='animate-spin'>Please Wait</Loader2></Button> : <Button type='submit' className='w-full bg-emerald-700' onClick={submitHandler}>Update</Button>}

                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
}
            
           


        </div>
    )
}

export default UpdateProfile
