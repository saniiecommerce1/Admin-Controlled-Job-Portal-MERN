import express from 'express';
import { signup, login, logout, updateProfile, updateProfilePic } from '../controller/user.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.middleware.js';
import multer from 'multer'

const router = express.Router();

const storage = multer.memoryStorage()
const singleFileUpload = multer({storage}).single('file')

router.post('/signup', singleFileUpload, signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile-pic', protectedRoute, singleFileUpload, updateProfilePic);
router.put('/update-profile', protectedRoute, singleFileUpload, updateProfile);

router.get('/check', protectedRoute, (req, res) => {
    res.status(200).json({ message: "Authorized", user: req.user });
});

export default router;
