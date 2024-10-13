
import express from 'express';
import requestValidate from '../../middlewares/requestValidate';
import { offeredCourseValidation } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';

const route= express.Router();

route.post('/create-offered-course', requestValidate(offeredCourseValidation.createOfferedCourseValidation), offeredCourseControllers.createOfferedCourse);


export const offeredCourseRoutes = route;