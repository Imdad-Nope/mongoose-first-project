import { Student } from './student.model';
import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync( async (req, res, next)=>{

        const result = await StudentServices.getAllStudentsFromDb();

        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        })
   
});

const getSingleStudent = catchAsync ( async (req, res, next) =>{
    
    const {studentId} = req.params;
    const result = await StudentServices.getSingleStudent(studentId);
    
    res.status(200).json({
        success: true,
        message: "Single student is got",
        data: result
    })
});

const deletedStudent = catchAsync( async (req, res, next) =>{
        const {studentId} = req.params;
        const result = await StudentServices.deletedStudentFromDb(studentId);
        
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result
        })
});

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deletedStudent
}