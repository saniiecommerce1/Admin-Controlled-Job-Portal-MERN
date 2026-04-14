import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import companyRoute from "./route/company.route.js";
import userRoute from "./route/user.route.js";
import jobRoute from "./route/job.route.js";
import applicationRoute from "./route/application.route.js";

import dotenv from "dotenv";
dotenv.config()


 const app = express();
 app.use(express.json())
 app.use(cookieParser())


 app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials: true    
 }))

app.get('/cookie' , (req, res)=>{
   res.cookie("JWT-TOKEN", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTM0NmVkOTVjY2RmY2JmMDM5ZGExYjciLCJpYXQiOjE3NjY4NDU0NzgsImV4cCI6MTc2NzQ1MDI3OH0.OlEVdplIDeC8JMbdLfrszBw5CZ8yOHHwGo53SystwFo; Path=/; HttpOnly; Expires=Sat, 03 Jan 2026 14:24:38 GMT;', {
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms in a week           
            httpOnly: true, // prevent XSS attacks: cross-site scripting document.cookie cannot access jwt cookie
            sameSite: "strict", // CSRF attacks customer site request forgery
            secure: process.env.NODE_ENV === "production" ? true : false //support https only in production
   }).status(201).json(
            {
                message: "Login Successfully",                
                success: true
            })




})

 app.use('/api/user' , userRoute)
 app.use('/api/company' , companyRoute)
 app.use('/api/job' , jobRoute)
 app.use('/api/application' , applicationRoute)



 app.listen(process.env.PORT, ()=>{
    console.log(`Server is connected on PORT : ${process.env.PORT}`)
    connectDB()
    
 })

