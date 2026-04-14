import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge.jsx'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs.jsx'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <Table>
      <TableCaption>List of Applied Jobs {allAppliedJobs?.length}</TableCaption>
      <TableHeader>
        <TableRow>
            <TableHead className="border border-gray-900">Date</TableHead>
            <TableHead className="border border-gray-900">Company</TableHead>
            <TableHead className="border border-gray-900">Job Role</TableHead>
            <TableHead className="border border-gray-900">Status</TableHead>
        </TableRow>
      </TableHeader>
        <TableBody>
           { allAppliedJobs?.length > 0 ? allAppliedJobs.map((job, index) => (
                  <TableRow key={index}>
                      <TableCell className="border border-gray-900">{job?.createdAt.split('T')[0]}</TableCell>
                      <TableCell className="border border-gray-900">{job?.jobId?.companyId?.companyName || 'N/A'}</TableCell>
                      <TableCell className="border border-gray-900">{job?.jobId?.title || 'N/A'}</TableCell>
                      <TableCell className="border border-gray-900">
                        {job?.status =='Applied' ? <Badge className='bg-[#e76610]'>{job?.status}</Badge> : 
                        job?.status == 'Viewed' ? <Badge className='bg-blue-500'>{job?.status}</Badge> :
                        job?.status == 'Interviewed' ? <Badge className='bg-green-500'>{job?.status}</Badge> :
                        job?.status == 'Rejected' ? <Badge className='bg-gray-500'>{job?.status}</Badge> : 
                        <Badge className='bg-green-900'>{job?.status || 'N/A'}</Badge>
                        }
                      </TableCell>
                  </TableRow> 
              )) : <TableRow><TableCell className="border border-gray-900 text-center" colSpan={4}>No Applied Job Here</TableCell></TableRow>}             
          </TableBody>

    </Table>
  )
}

export default AppliedJobTable
