import { Job } from '../modal/Job.modal.js'

export const postJob = async (req, res) => {

    try {
        const { title, description, requirements, position, salary, experience, location, jobType, mode, companyId } = req.body

        if (!title || !description || !requirements || !position || !salary || !experience || !location || !jobType || !mode || !companyId) {
            return res.status(401).json({
                message: "Some Fields are missing",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            position,
            salary,
            experience,
            location,
            jobType,
            mode,
            companyId,
            createdByUserId: req.user._id
        })

        res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: "Job Posted Failed" + error.message,
            success: false
        })
    }
}

export const getAllJob = async (req, res) => {

   try {
     const keyword = req.query.keyword || "" //if keyword is not provided, default to empty string

    const allJobs = await Job.find({ $or: 
        [
        { title: { $regex: keyword, $options: "i" } }, //i case insensitive
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { mode: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        ] 
        }).populate(
            { path: "companyId"}
            ).sort(
                
                {createdAt: -1})

    if (allJobs.length < 1) 
        return res.status(404).json({
                message: "No Job Found",
                success: false
            })  
            
    res.status(200).json({
            message: "All Jobs here",
            job: allJobs,
            success: true
        });      
   } catch (error) {
        res.status(500).json({
            message: "Job Failed",         
            success: false
        });
   }

}


export const getJobById = async(req, res)=>{
    try {
        const job = await Job.findById(req.params.id).populate({
            path: "applicationIds"
        }).sort({createdAt: -1})
             if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });   
    } catch (error) {
            res.status(500).json({
            message: "Job Failed" + error.message,         
            success: false
        });
    }
}




export const getCreatedJobs = async (req, res) => {
    try {
    
        const jobs = await Job.find({ createdByUserId: req.user._id }).populate({
            path:'companyId',
            createdAt:-1
        });
        if (!jobs.length) {
            return res.status(401).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
            res.status(500).json({
            message: "Job Failed",         
            success: false
        });
    }
}
