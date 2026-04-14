import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';

const ApplicantsTable = () => {

    const shortlistingStatus = ['Applied', "Viewed", "Interviewed", "Hired", "Rejected"]
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch()

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APPLICATION_URL}/recruiter/status/${id}`, { status }, { withCredentials: true });

            if (res.data.success) {
                const updatedApplicationIds = applicants?.applicationIds?.map(app => {
                    if (app._id === id) {
                        return { ...app, status: status };
                    }
                    return app;
                });    
                dispatch(setAllApplicants({ ...applicants, applicationIds: updatedApplicationIds }));                    
                toast.success(res.data.message);
             
            }

        } catch (error) {
            toast.error('Status update failed. Please try again.');
        }
    }


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border border-gray-900">FullName</TableHead>
                        <TableHead className="border border-gray-900">Email</TableHead>
                        <TableHead className="border border-gray-900">Contact</TableHead>
                        <TableHead className="border border-gray-900">Resume</TableHead>
                        <TableHead className="border border-gray-900">Date</TableHead>
                        <TableHead className="border border-gray-900">Status</TableHead>
                        <TableHead className="border border-gray-900 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {    //applicants are the job table here
                        applicants && applicants?.applicationIds?.map((item) => (
                            <tr key={item._id}>

                                <TableCell className="border border-gray-900">{item?.userId?.fullName}</TableCell>
                                <TableCell className="border border-gray-900">{item?.userId?.email}</TableCell>
                                <TableCell className="border border-gray-900">{item?.userId?.phoneNumber}</TableCell>
                                <TableCell className="border border-gray-900" >
                                    {
                                        item.userId?.profile?.resumeLink ? <a className="text-blue-600 cursor-pointer" href={item?.userId?.profile?.resumeLink} target="_blank" rel="noopener noreferrer">{item?.userId?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="border border-gray-900">{item?.userId.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="border border-gray-900">{item?.status}</TableCell>
                                <TableCell className="border border-gray-900 text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable