import { Student, studentSchema } from "./student.model";
import { TStudent } from "./student.interface";
import { populate } from "dotenv";
import mongoose from "mongoose";
import { AppError } from "../../errors/app.error";
import httpStatus, { BAD_REQUEST } from "http-status";
import { User } from "../user/user.model";


const getAllStudentsFromDb = async () =>{
    const result = await Student.find().populate('academicSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    }); 

    return result;
};

const getSingleStudent = async (id: string) =>{
    const result = await Student.findOne({id});
    // const result = await Student.aggregate([{$match: {id: id}}])
    return result;
};

// Updated the data ---.

const updateStudentIntoDb = async(id: string, payload: Partial<TStudent> )=>{
    const {name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedStudentData: Record<string, unknown> = { ...remainingStudentData,};

    /* 
    name.firstName = 'Md'
    name.lastName = 'Ala'
    */

  

    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
            modifiedStudentData[`name.${key}`] = value;
        }
          
    }
    /* 
    guardain: {
        fatherOccupation:"Teacher"
        }
        
        guardian.fatherOccupation = Teacher
        
        */
       
       if(guardian && Object.keys(guardian).length){
           for(const [key, value] of Object.entries(guardian)){
               modifiedStudentData[`guardian.${key}`] = value;
            }
            
        };
        
        /* 
        
        lovalGuardain: {
            fatherOccupation:"Teacher"
            }
            guardian.fatherOccupation = Teacher
            */
           
           if(localGuardian && Object.keys(localGuardian)){
               for(const [key, value] of Object.entries(localGuardian)){
                   modifiedStudentData[`localGuardian.${key}`] = value;
                }
                
            };
            
            console.log(modifiedStudentData)
    const result = await Student.findOneAndUpdate({id}, modifiedStudentData, {
        new: true,
        runValidators: true
    });
    console.log(result, "updated data")
    return result
};



const deletedStudentFromDb = async (id: string)=>{
    const session = await mongoose.startSession()
   try{
        // 1st transaction --->
        session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
        {id},
        {isDeleted: true},
        {new: true, session}
    );
    if(!deletedStudent){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to deleted the student")
    };

    const deletedUser = await User.findOneAndUpdate(
       { id},
        {isDeleted: true},
        {new: true, session}
    );
    // 2nd transaction --->
    if(!deletedUser){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete the User")
    };

    await session.commitTransaction();
    await session.endSession()
    return deletedStudent;
   } catch(error){
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(BAD_REQUEST, "Failed to delete the student !")
   }
}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudent,
    updateStudentIntoDb,
    deletedStudentFromDb
}