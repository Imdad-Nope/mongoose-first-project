import { Student } from './../student.model';
import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response)=>{
    try{
        const {student: studentData} = req.body;

        // Student validation Schema with Zod...
   
        const zodParsedData = studentValidationSchema.parse(studentData)

        const result = await StudentServices.createStudentIntoDb(zodParsedData);

    res.status(200).json({
        success: true,
        message: "Students created successfully",
        data: result
    })
    } catch(error: any){
       res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
        error
       })
    }
};

const getAllStudents = async (req: Request, res: Response)=>{
    try{
        const result = await StudentServices.getAllStudentsFromDb();

        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Did not match nicely",
            err
        })
    }
};

const getSingleStudent = async (req: Request, res: Response) =>{
    try{
        const {studentId} = req.params;
    const result = await StudentServices.getSingleStudent(studentId);
    
    res.status(200).json({
        success: true,
        message: "Single student is got",
        data: result
    })

    }catch(err){
       res.status(500).json({
        success: false,
        Message: "Did no find single student",
        err
    })
    }

};

const deletedStudent = async (req: Request, res: Response) =>{
    try{
        const {studentId} = req.params;
        const result = await StudentServices.deletedStudentFromDb(studentId);
        
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Did no delete the data",
            err
        })
    }
}

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deletedStudent
}