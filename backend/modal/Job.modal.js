import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experience:{
        type:String,
        required:true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full Time', 'Part Time']
    },
    mode :{
        type: String,
        enum: ['Remote', 'On-Site', 'Hybrid']
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    applicationIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    createdByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
})

export const Job = mongoose.model( 'Job' , jobSchema)