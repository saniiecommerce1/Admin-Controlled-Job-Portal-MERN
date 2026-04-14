import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'

import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'



const PostJob = () => {

    const jobTypeArray = ['Full Time', 'Part Time'];
    const modeArray = ['Remote', 'On-Site', 'Hybrid'];

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
        mode: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }; 

     const selectChangeHandler = (field , value) => {
        setInput({ ...input, [field]: value });
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const manipulatedInput = { ...input, requirements: input.requirements.split(",").map(req => req.trim()) };
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_JOB_URL}/register`, manipulatedInput, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements <span className="text-xs text-muted-foreground">(i.e Skill1, Skill2, Skill3)</span></Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                 
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <Select onValueChange={(value) => selectChangeHandler('mode' , value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Job Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        modeArray.map((mode, index) => {
                                            return (
                                                <SelectItem key={index} value={mode}>{mode}</SelectItem>
                                            )
                                        })
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => selectChangeHandler('jobType' , value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Job Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        jobTypeArray.map((type, index) => {
                                            return (
                                                <SelectItem key={index} value={type}>{type}</SelectItem>
                                            )
                                        })
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>





                        {
                            companies.length > 0 && (
                                <Select onValueChange={(value) => selectChangeHandler('companyId' , value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company, index) => {
                                                    return (
                                                        <SelectItem key={index} value={company._id}>
                                                            {company?.companyName}
                                                        </SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob