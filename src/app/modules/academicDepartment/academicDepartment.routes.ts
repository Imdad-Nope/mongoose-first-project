import express from 'express';
import requestValidate from '../../middlewares/requestValidate';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();
// Post

router.post('/create-academic-department', requestValidate(academicDepartmentValidation.createAcademicDepartmentValidationSchema),academicDepartmentController.createAcademicDepartmentController);

// Get Single

router.get('/:departmentId', academicDepartmentController.getSingleAcademicDepartmentController);

// Get all

router.get('/', academicDepartmentController.getAllAcademicDepartmentController);

// Update 

router.patch('/:departmentId', requestValidate(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartmentController.updateAcademicDepartmentController);


export const academicDepartmentRoutes = router;