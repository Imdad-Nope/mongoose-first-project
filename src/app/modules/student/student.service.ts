import { Student } from "./student.model";
import { TStudent } from "./student.interface";


const getAllStudentsFromDb = async () =>{
    const result = await Student.find();
    return result;
};

const getSingleStudent = async (id: string) =>{
    // const result = await Student.findOne({id});
    const result = await Student.aggregate([{$match: {id: id}}])
    return result;
};

const deletedStudentFromDb = async (id: string)=>{
    const result = await Student.updateOne({id}, {isDeleted: true});

    return result;
}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudent,
    deletedStudentFromDb
}