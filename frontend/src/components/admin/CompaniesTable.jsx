import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import companyLogo from '../../assets/company-logo.jpg'



const CompaniesTable = () => {

  
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchCompanyByText) {
            const filteredCompany = companies?.filter((company) => company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase()));
            setFilterCompany(filteredCompany);
        }
        else setFilterCompany(companies);
    }, [companies, searchCompanyByText])

    useEffect(() => {
        setFilterCompany(companies);
    }, [companies])

    return (
        <div>
            <Table className="border-collapse  border border-gray-900">
                <TableCaption >A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border border-gray-900">S.No.</TableHead>
                        <TableHead className="border border-gray-900">Logo</TableHead>
                        <TableHead className="border border-gray-900">Name</TableHead>
                        <TableHead className="border border-gray-900">Date</TableHead>
                        <TableHead className="text-right border border-gray-900">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company, index) => (
                            <tr key={index}>
                                <TableCell className="border border-gray-900">{index + 1}</TableCell>
                                <TableCell className="border border-gray-900">
                                    <Avatar>
                                        <AvatarImage src={company.logo || companyLogo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="border border-gray-900">{company.companyName}</TableCell>
                                <TableCell className="border border-gray-900">{company.createdAt.split("T")[0]}</TableCell>

                                <TableCell className="cursor-pointer border border-gray-900">
                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex justify-end gap-2 cursor-pointer '>
                                    <Edit2 className='w-4' />
                                    </div>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
