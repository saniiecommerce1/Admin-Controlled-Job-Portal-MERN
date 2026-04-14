import jwt from 'jsonwebtoken';
import {User} from '../modal/User.modal.js';
import dotenv from "dotenv";
dotenv.config();

export const protectedRoute = async (req, res, next) => {

    const token = req.cookies["JWT-TOKEN"];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        console.error({ message: `Error in Protected Route Middleware: ${error.message}` });
        res.status(403).json({ message: "Forbidden" });
    }
}
