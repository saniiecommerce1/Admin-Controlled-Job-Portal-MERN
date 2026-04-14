import { Job} from "../modal/Job.modal.js"
import { Application } from "../modal/Application.modal.js"

export const applyJob = async(req, res)=>{
    try {
        const jobId = req.params.id
        const userId = req.user._id

        const applied = await Application.findOne({jobId, userId})
        if (applied)
            return res.status(401).json({message: "Already Applied",
                                         success: false})
        
       const job = await Job.findById(jobId) 
       if (!job)                                
         return res.status(401).json({message: "No Job is Here ",
                                         success: false})


    const newApplication =  await Application.create({
                userId,
                jobId
            })

        job.applicationIds.push(newApplication._id)    
        await job.save()

        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })

    } catch (error) {
            res.status(500).json({
            message: "Company Get Failed By Id.",       
            success: false
        })
    }
}


export const getAppliedJobs= async(req,res)=>{
    try {
        const userId = req.user._id
        const appliedJobs = await Application.find({userId}).sort({createdAt: -1}).populate('userId', 'fullName createdAt').
        populate({
            path: "jobId",  
            select: "title",     
            populate: {
                path: "companyId",
                select: "companyName"
            },
            // options: {
            //     sort: {createdAt: -1}
            // },
        })

        if (appliedJobs.length === 0){
            return res.status(401).json({
                message: "No Applied Job Here",
                success: false
            })
        }

            res.status(200).json({
            applications: appliedJobs,    
            success:true})


    } catch (error) {
            res.status(500).json({
            message: "Company Get Failed By Id.",       
            success: false
        })
    }
}

//for Recruiter
export const getApplicants = async(req, res)=>{
  try {  
   const userId =  req.user._id
   const jobId = req.params.id
   const job = await Job.findOne({_id: jobId,
                    createdByUserId: userId}).populate({
                        path: "applicationIds",
                        populate:{
                            path: "userId"
                        },
                        options: {
                            sort: {
                                createdAt: -1
                            }
                        }
                    })

            res.status(200).json({
            message:"Job applied successfully.",
            job,
            success:true
        })

    } catch (error) {
            res.status(500).json({
            message: error.message || "Company Get Failed By Id.",       
            success: false
        })
    }                
}

//for Recruiter
export const changeApplicationStatus = async (req,res)=>{
try {
       const {status} =  req.body
   const id = req.params.id
   const application = await Application.findById(id)
   if (!application) {
        return res.status(401).json({
                message: "No Application Here",
                success: false
            })
   }

   application.status = status

   await application.save()

        res.status(201).json({
            message:"Status updated successfully.",
            status,
            success:true
        });
} catch (error) {
            res.status(500).json({
            message: "Company Get Failed By Id." + error.message ,       
            success: false
        })    
}
}
