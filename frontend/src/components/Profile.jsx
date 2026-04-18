import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button.jsx'
import { Contact2, Mail } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar.jsx'
import { useSelector,useDispatch  } from 'react-redux'
import { Badge } from './ui/badge.jsx'
import UpdateProfile from './UpdateProfile.jsx'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '../redux/userSlice.js'


const Profile = () => {

    const { user } = useSelector(store => store.user)

    const isResume = user?.profile?.resumeLink ? true : false

    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    // const [imageLink, setImageLink] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;  
        
        
        // You can also implement the upload logic here
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            setLoading(true)
            const result = await axios.put(`${import.meta.env.VITE_USER_URL}/update-profile-pic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (result.data.user) {

                dispatch(setUser(result.data.user))
                // setImageLink(result.data.user.profile.profileImage);
                toast.success(result.data.message)

            }


        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Failed to update profile picture")
        }
        finally {
            setLoading(false)
        }
    }


    return (
        
            <div className='max-w-4xl mx-auto bg-white border border-gray-300 shadow-xl rounded-2xl mt-10 p-8 flex flex-col gap-9'>
                <div className='flex justify-between'>
                    <div className='flex gap-1'>
                        <Avatar className='h-14 w-14'>
                            <AvatarImage src={ user?.profile?.profileImage || "https://kawaii-avatar.vercel.app/api/avatar"} alt='profile' onClick={handleImageClick} className='cursor-pointer' />
                        </Avatar>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            hidden
                            onChange={handleFileChange}
                        />
                        <div>
                            <h1 className='font-medium text-xl pt-4'>{user?.fullName}</h1>
                            <p>{user?.profile?.title}</p>
                        </div>
                    </div>
                    <UpdateProfile />
                </div>

                <div>
                    <div className='flex gap-4 mb-2'>
                        <Mail />
                        <div>{user?.email}</div>
                    </div>
                    <div className='flex gap-4'>

                        <Contact2 />
                        <div>{user?.phoneNumber}</div>
                    </div>
                </div>
                <div>
                    <h1 className='font-medium mb-2'>Skills</h1>
                    <div className='flex gap-3'>{user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((skill, index) => (<Badge key={index} className={'text-[#e76610] font-bold'} variant="ghost">{skill}</Badge>)) : <span>NA</span>}</div>
                </div>
                <div>
                    <h1 className='font-medium mb-2'>Resume in PDF format</h1>
                    {isResume ? <a target='blanket' href={user?.profile?.resumeLink}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>}

                </div>



            </div>

          


    )
}

export default Profile
