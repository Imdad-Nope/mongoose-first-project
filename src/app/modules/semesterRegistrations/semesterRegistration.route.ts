import express from 'express';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import requestValidate from '../../middlewares/requestValidate';
import { semesterRegistrationSchemaModel } from './semesterRegistration.model';
import { semesterRegistrationController } from './semesterRegistration.controller';

const route = express.Router();

route.post('/create-semester-registration', requestValidate(semesterRegistrationValidation.semesterRegistrationValidationSchema), semesterRegistrationController.createSemesterRegistration);

route.get('/', semesterRegistrationController.getAllSemesterRegistrationFromDb);

route.get('/:id', semesterRegistrationController.getSingleSemesterRegistrationFromDb);

route.patch('/:id', semesterRegistrationController.updateSemesterRegistrationIntoDb);

export const semesterRegistrationRoutes = route;