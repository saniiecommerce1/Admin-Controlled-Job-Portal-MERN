import express from 'express'
import { protectedRoute } from '../middleware/protectedRoute.middleware.js'
import { applyJob, getApplicants, getAppliedJobs, changeApplicationStatus } from '../controller/application.controller.js'
const router = express.Router()

router.use(protectedRoute)

router.get('/apply-jobs/:id', applyJob);
router.get('/recruiter/applicants/:id', getApplicants);
router.get('/applied-jobs', getAppliedJobs);
router.post('/recruiter/status/:id', changeApplicationStatus);

export default router;