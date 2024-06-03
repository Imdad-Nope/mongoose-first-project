import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response)=>{
    try{
        const {student: studentData} = req.body;
    const result = await StudentServices.createStudentIntoDb(studentData);

    res.status(200).json({
        success: true,
        message: "Students created successfully",
        data: result
    })
    } catch(err){
        console.log(err)
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
        console.log(err)
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
        console.log(err)
    }

}

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent
}