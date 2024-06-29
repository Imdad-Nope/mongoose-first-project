import { Student, studentSchema } from './student.model';
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

const updateStudentIntoDb = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const {student} = req.body;
    const result = await StudentServices.updateStudentIntoDb(id, student);
console.log(id, student, result, "controllers ")
    res.status(200).json({
        success: true,
        message: "student updated successfully !",
        data: result
    })
})

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
    updateStudentIntoDb,
    deletedStudent
}