import express from 'express'
import { protectedRoute } from '../middleware/protectedRoute.middleware.js'
import { getCompanyByCreatedUserId, getCompanyById, registerCompany, updateCompany } from '../controller/company.controller.js'
import multer from 'multer'

const router = express.Router();

const storage = multer.memoryStorage()
const singleFileUpload = multer({storage}).single('file')

router.use(protectedRoute)

router.post('/register', registerCompany);
router.get('/userId/all', getCompanyByCreatedUserId);
router.get('/:id', getCompanyById);
router.put('/update/:id',singleFileUpload, updateCompany);

export default router;