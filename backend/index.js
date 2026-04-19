import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import companyRoute from "./route/company.route.js";
import userRoute from "./route/user.route.js";
import jobRoute from "./route/job.route.js";
import applicationRoute from "./route/application.route.js";
import path from "path";




import dotenv from "dotenv";
dotenv.config()


 const app = express();
 app.use(express.json())
 app.use(cookieParser())

const __dirname = path.resolve();


//  app.use(cors({
//     origin : process.env.CLIENT_URL,
//     credentials: true    
//  }))

//FE + BE same server 
//credentials true is must for cookie to work in FE + BE same server

 app.use(cors({
    origin : "*",
     credentials: true
 }));


 app.use('/api/user' , userRoute)
 app.use('/api/company' , companyRoute)
 app.use('/api/job' , jobRoute)
 app.use('/api/application' , applicationRoute)

 // serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//must add 0.0.0.0 route for Docker to work
 app.listen(process.env.PORT, '0.0.0.0', ()=>{
    console.log(`Server is connected on PORT : ${process.env.PORT}`)
    connectDB()
    
 })

