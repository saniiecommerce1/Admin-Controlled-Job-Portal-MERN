import { generateToken } from "../lib/token.js"
import { User } from "../modal/User.modal.js"
import bcrypt from 'bcryptjs'
import getDataUri from "../lib/dataUri.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    try {

        const { fullName, email, password, role, phoneNumber } = req.body
        if (!fullName || !email || !password || !role || !phoneNumber) {
            return res.status(404).json(
                {
                    message: "Some Fields are Missing",
                    success: false
                })
        }


        const user = await User.findOne({ email })
        if (user)
            return res.status(404).json(
                {
                    message: "User already Exists",
                    success: false
                })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let uploadResult = null

        if (req.file)   {
            //upload to cloudinary and get the url
            const file = req.file   
            const fileUri = getDataUri(file)
            uploadResult = await cloudinary.uploader.upload(fileUri.content, {
                folder: "job-portal/image"
            })
        }   

        const newUser = await User.create({
            fullName, email, password: hashedPassword, role, phoneNumber, profile: { profileImage: uploadResult?.secure_url || null }
        })

        generateToken(newUser._id, res)   

        return res.status(201).json(
            {
                message: "Account created successfully",
                user: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    role: newUser.role,
                    phoneNumber: newUser.phoneNumber,
                    profile: newUser.profile,
                },
                success: true
            })
    }
    catch (error) {
        res.status(500).json(
            {
                message: `signup: ${error.message}`,
                success: false
            })

    }
}

export const login = async (req, res) => {
    try {
   
        const { email, password, role } = req.body
        if (!email || !password || !role)
            return res.status(404).json(
                {
                    message: "Some Fields are missing",
                    success: false
                })

        const user = await User.findOne({ email, role })

        let isPasswordCorrect = false
        if (user) isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!user || !isPasswordCorrect)
            return res.status(401).json({
                message: "Email/Password/Role is not Correct",
                success: false
            })

        generateToken(user._id, res)

        return res.status(201).json(
            {
                message: "Login Successfully",
                user,
                success: true
            })


    } catch (error) {
        res.status(500).json(
            {
                message: `login: ${error.message}`,
                success: false
            })
    }
}

export const logout = async (_, res) => {

    try {
        res.clearCookie("JWT-TOKEN", {

            httpOnly: true, // prevent XSS attacks: cross-site scripting document.cookie cannot access jwt cookie
            sameSite: "strict", // CSRF attacks customer site request forgery
            secure: process.env.NODE_ENV === "production" ? true : false, //support https only in production
            path: '/'
        });

        res.status(201).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        res.status(500).json(
            {
                message: `logout: ${error.message}`,
                success: false
            })

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, phoneNumber, title, skills } = req.body

        const userId = req.user._id
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.staus(401).json({
                message: "User not Found",
                success: false
            })
        }

        if (fullName) user.fullName = fullName
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (skills) user.profile.skills = skills.split(',').map(skill => skill.trim())
        if (title) user.profile.title = title

        if (req.file) {
            //upload to cloudinary and get the url
            const file = req.file
            const fileUri = getDataUri(file)
            const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
                folder: "job-portal/resume"
            })
            user.profile.resumeLink = uploadResult.secure_url
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save()

        res.status(201).json({
            message: "User Updated Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                profile: user.profile,

            },
            success: true
        })

    } catch (error) {
        res.status(500).json(
            {
                message: `updateProfile: ${error.message}`,
                success: false
            })
    }
}

export const updateProfilePic = async (req, res) => {
    try {

        const userId = req.user._id

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.staus(401).json({
                message: "User not Found",
                success: false
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            })
        }

        //upload to cloudinary and get the url
        const file = req.file
        const fileUri = getDataUri(file)
        const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
            folder: "job-portal/image"
        })
        user.profile.profileImage = uploadResult.secure_url

        await user.save()

        res.status(201).json({
            message: "User Updated Profile Pic Successfully",
            user,
            success: true
        })

    } catch (error) {
        res.status(500).json(
            {
                message: `updateProfile: ${error.message}`,
                success: false
            })
    }
}