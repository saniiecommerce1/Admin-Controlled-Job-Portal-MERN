import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
    fullName: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true ,
        unique: true       
    },
    password:{
         type: String,
        required: true 
      },

    phoneNumber:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum: ['Job Seeker' , 'Recruiter']
    },

    profile:{
        title: {
            type: String            
        },
        skills : [{type: String }],
        resumeLink : {
            type: String,
        },
        resumeOriginalName:{type:String},
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profileImage: {
            type: String,
            default: ""
        }
    }  
},{
    timestamps: true
})

export const User = mongoose.model('User', userSchema)