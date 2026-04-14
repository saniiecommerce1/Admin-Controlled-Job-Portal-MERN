import mongoose, { mongo } from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        reqiuired: true,
        unique: true},

    companySize: {
        type: String,
        reqiuired: true
    },
    logo:{
        type: String
    },
    infoEmail: {
        type: String
    },
    location: {
        type: String
    },
    createdByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true})

export const Company = mongoose.model('Company', companySchema)