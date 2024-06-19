import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controllers';
import requestValidate from '../../middlewares/requestValidate';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester', requestValidate(AcademicSemesterValidations.createSemesterValidation), AcademicSemesterControllers.createAcademicSemesterControllers);

router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);

router.patch('/:semesterId',  requestValidate(AcademicSemesterValidations.UpdatedSemesterValidation), AcademicSemesterControllers.updateAcademicSemester);

export const academicSemesterRoutes = router;