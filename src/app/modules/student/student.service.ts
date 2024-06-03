import { StudentModel } from "../student.module";
import { Student } from "./student.interface";

const createStudentIntoDb = async (student: Student)=>{
    const result = await StudentModel.create(student);
    return result;
};

const getAllStudentsFromDb = async () =>{
    const result = await StudentModel.find();
    return result;
};

const getSingleStudent = async (id: string) =>{
    const result = await StudentModel.findOne({id});
    return result;
}

export const StudentServices = {
    createStudentIntoDb,
    getAllStudentsFromDb,
    getSingleStudent
}