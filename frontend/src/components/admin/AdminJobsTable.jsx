import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
       
        if(searchJobByText){
        const filteredJobs = allAdminJobs?.filter((job)=>job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.companyId?.companyName.toLowerCase().includes(searchJobByText.toLowerCase()));

        setFilterJobs(filteredJobs);
        }
        else setFilterJobs(allAdminJobs);
    },[allAdminJobs,searchJobByText])
    
    
    
    return (
        <div>
            <Table className="border-collapse  border border-gray-900">
                <TableCaption>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border border-gray-900">Company Name</TableHead>
                        <TableHead className="border border-gray-900">Title</TableHead>
                        <TableHead className="border border-gray-900">Date</TableHead>
                        <TableHead className="border border-gray-900 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job, index) => (
                            <tr key={index+1}>
                                <TableCell className="border border-gray-900">{job?.companyId?.companyName}</TableCell>
                                <TableCell className="border border-gray-900">{job?.title}</TableCell>
                                <TableCell className="border border-gray-900">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="border border-gray-900 text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {/* <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div> */}
                                            <div onClick={()=> navigate(`/admin/jobs/applicants/${job._id}`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
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

export default AdminJobsTable