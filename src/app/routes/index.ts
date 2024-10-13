import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRoutes } from "../modules/academicSemesters/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistrations/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/offeredCourses/offeredCourse.route";
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
    {
        path: "/academic-faculties",
        route: academicFacultyRoutes
    },
    {
        path: "/academic-department",
        route: academicDepartmentRoutes
    },
    {
        path: "/semester-registration",
        route: semesterRegistrationRoutes
    },
    {
        path: "/offered-course",
        route: offeredCourseRoutes
    }
];

moduleRoutes.forEach((route)=>router.use(route.path, route.route));

export default router;