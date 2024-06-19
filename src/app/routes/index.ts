import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRoutes } from "../modules/academicSemesters/academicSemester.route";
const router = Router();

const moduleRoutes = [
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/academic-semesters",
        route: academicSemesterRoutes
    },
];

moduleRoutes.forEach((route)=>router.use(route.path, route.route));

export default router;