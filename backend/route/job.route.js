import express from 'express'
import { protectedRoute } from '../middleware/protectedRoute.middleware.js'
import { getAllJob, getCreatedJobs, getJobById, postJob } from '../controller/job.controller.js';
const router = express.Router()

router.get('/all', getAllJob);

router.use(protectedRoute)
router.post('/register', postJob);
router.get('/recruiter', getCreatedJobs);
router.get('/job/:id', getJobById);

export default router;