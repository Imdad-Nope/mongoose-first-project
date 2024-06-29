import express from 'express';
import requestValidate from '../../middlewares/requestValidate';
import { academicFacultyControllers } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';


const router = express.Router();

// Post 

router.post('/create-academic-faculty', requestValidate(academicFacultyValidation.createAcademicFacultyValidationSchema), academicFacultyControllers.createAcademicFacultyController);

// Get

router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFacultyController
);

// Patch 

router.patch('/:facultyId', requestValidate(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyControllers.updateAcademicFacultyController);

router.get('/', academicFacultyControllers.getAllAcademicFacultyController)

export const academicFacultyRoutes = router;