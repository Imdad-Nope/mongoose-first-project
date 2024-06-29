import express from "express";
import { StudentController } from "./student.controller";
import requestValidate from "../../middlewares/requestValidate";
import { studentValidation, updateStudentValidationSchema } from "./student.validation";

const router = express.Router();

router.get('/', StudentController.getAllStudents);

router.patch('/:id', requestValidate(updateStudentValidationSchema), StudentController.updateStudentIntoDb)

router.get('/:studentId', StudentController.getSingleStudent);

router.delete('/:studentId', StudentController.deletedStudent)

export const StudentRoutes = router;