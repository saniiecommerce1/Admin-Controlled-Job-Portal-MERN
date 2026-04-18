import cloudinary from '../lib/cloudinary.js'
import getDataUri from '../lib/dataUri.js'
import { Company } from '../modal/Company.modal.js'


export const registerCompany = async (req, res) => {

    try {
        const { companyName } = req.body
        if (companyName) {
            const companyExists = await Company.findOne({ companyName })
            if (companyExists)
                return res.status(401).json({
                    message: "Company Name already Registered",
                    success: false
                })
        }

        const { companySize, location, infoEmail } = req.body
        
        const addCompany = await Company.create({
            companyName,
            companySize: companySize || '',
            logo: '',
            location: location || '',
            infoEmail: infoEmail || '',
            createdByUserId: req.user._id
        })

        res.status(201).json({
            message: "Company registered successfully.",
            company: addCompany,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Company Registered Failed. " + error.message,
            success: false
        })
    }

}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const getCompany = await Company.findById(companyId)
        if (!getCompany)
            return res.status(401).json({
                message: "Company Not Registered",
                success: false
            })

        res.status(200).json({
            message: "Company get successfully.",
            company: getCompany,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Company Get Failed.",
            success: false
        })
    }


}


export const getCompanyByCreatedUserId = async (req, res) => {

    try {
        const userId = req.user._id

        const getCompany = await Company.find({ createdByUserId: userId })

        if (getCompany.length === 0)
            return res.status(401).json({
                message: "Company Not Registered with Requested User",
                success: false
            })

        res.status(200).json({
            message: "Company get successfully.",
            companies: getCompany,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Company Get Failed By Id.",
            success: false
        })
    }


}

export const updateCompany = async (req, res) => {

    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log(req.body, updatedCompany)
        if (!updatedCompany)
            return res.status(401).json({
                message: "Company Not Updated",
                success: false
            })

                    if (req.file) {
            //upload to cloudinary and get the url
            const file = req.file
            const fileUri = getDataUri(file)
            const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
                folder: "company/logo"
            })
            updatedCompany.logo = uploadResult.secure_url
        }
        await updatedCompany.save()

        res.status(201).json({
            message: "Company get successfully.",
            company: updatedCompany,
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Company Update Failed By Id.",
            success: false
        })
    }

}
