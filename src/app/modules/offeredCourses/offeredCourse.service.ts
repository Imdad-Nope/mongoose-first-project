import httpStatus from "http-status";
import { AppError } from "../../errors/app.error";
import { semesterRegistrationSchemaModel } from "../semesterRegistrations/semesterRegistration.model";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { TofferedCourse } from "./offeredCourse.interface";
import { offeredCourseModel } from "./offeredCourse.model";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import app from "../../../app";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDb = async(payload: TofferedCourse)=>{

    const {
        semesterRegistration,
        academicFaculty, 
        academicDepartment, 
        // courses, 
        // faculty,
        section, 
        days, 
        startTime, 
        endTime } = payload;

        // Semester Registration id exist or not

        const isSemesterRegistrationExist = await semesterRegistrationSchemaModel.findById(semesterRegistration);

        if(!isSemesterRegistrationExist){
            throw new AppError(httpStatus.NOT_FOUND, 'semesterRegistration does not exist here !')
        };

        const academicSemester = isSemesterRegistrationExist.academicSemester;

        // Academic faculty exist or not 
        const isAcademicFacultyExist = await academicFacultyModel.findById(academicFaculty);

        if(!isAcademicFacultyExist){
            throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty does not exist here !')
        };

        // Academic department exist or not 

        const isAcademicDepartmentExist = await academicDepartmentModel.findById(academicDepartment);

        if(!isAcademicDepartmentExist){
            throw new AppError(httpStatus.NOT_FOUND, 'Academic department does not exist here !')
        };

        // Courses exist or not

        
        // Faculty exist or not 

        // is department belong to the faculty --

        const isDepartmentBelongToTheFaculty = await academicDepartmentModel.findOne({
            _id: academicDepartment,
            academicFaculty
        });

        if(!isDepartmentBelongToTheFaculty){
            throw new AppError(httpStatus.BAD_REQUEST, `This ${isAcademicDepartmentExist.name} does not belong to ${isAcademicFacultyExist.name} `)
        };

        // Same offeredCourse with same registered in same section 

        const isSameOfferedCourseWithSameRegisteredInSameSectionExist = await offeredCourseModel.findOne({
            semesterRegistration,
            // courses,
            section
        });

        if(isSameOfferedCourseWithSameRegisteredInSameSectionExist){
            throw new AppError(httpStatus.BAD_REQUEST, 'Same offered course existed here !')
        };

        // Schedule time

        const assignedSchedule = await offeredCourseModel.find({
            semesterRegistration,
            // faculty,
            days: {$in: days }
        }).select('days startTime endTime')

        // New schedule

        const newSchedules ={
            days,
            startTime,
            endTime
        };

        if(hasTimeConflict(assignedSchedule, newSchedules)){
            throw new AppError(httpStatus.CONFLICT, 'Offered course schedule already ended ! seek another schedule or wait for next schedule..')
        };

    const result = await offeredCourseModel.create( { 
        ...payload,
        academicSemester
    });
     return result
};


export const offeredCourseServices = {
    createOfferedCourseIntoDb
}