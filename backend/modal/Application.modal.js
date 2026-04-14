import mongoose, { mongo } from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    status:{
        type: String,
        enum: ["Applied", "Viewed" , "Interviewed", "Hired" , "Rejected"],
        default: "Applied"
           
    }
}, {timestamps:true})

export const Application = mongoose.model("Application" , applicationSchema)

