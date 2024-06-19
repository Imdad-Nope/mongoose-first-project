import express from "express";
import { userControllers } from "./user.controller";
import requestValidate from "../../middlewares/requestValidate";
import { createStudentValidationSchema } from "../student/student.validation";

const router = express.Router();

router.post('/create-user', requestValidate(createStudentValidationSchema), userControllers.createUser);

export const userRoutes = router;