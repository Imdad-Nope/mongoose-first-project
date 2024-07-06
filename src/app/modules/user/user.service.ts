import { academicSemesterRoutes } from './../academicSemesters/academicSemester.route';
import { User } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import { academicSemesterModel } from "../academicSemesters/academicSemester.model";
import { generatedStudentId } from './user.utils';
import mongoose from 'mongoose';
import { AppError } from '../../errors/app.error';
import httpStatus from 'http-status';


const createUserIntoDb = async (password: string, payload: TStudent)=>{

    const userData: Partial<TUser> = {};


    userData.password = password || (config.default_Password as string)

    // if(!password){
    //    user.password = config.default_Password as string
    // } else{
    //     user.password = password;
    // }

    // set a student rol --
    userData.role = 'student'

    // set information --
    
    const admissionSemester: any = await academicSemesterModel.findById(payload.academicSemester);

    // Session started -- >

    const session = await mongoose.startSession()
      try {
        // Start session transaction -->
        
        session.startTransaction()

        // set a student id 
    
     userData.id = await generatedStudentId(admissionSemester)

     // create a user  <-- transaction -1 -->
     const newUser = await User.create([userData], {session}); // Array 
 
     // create student 
     if (!newUser.length){
        throw new AppError(httpStatus.BAD_REQUEST, "New user did not create !")
    };
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id // reference object
 
    
     // New student <--- Transaction 2 -->
     const newStudent = await Student.create([payload], {session})
    if(!newStudent.length){
        throw new AppError(httpStatus.BAD_REQUEST, "New student did not create ! ")
    };
   await session.commitTransaction();
   await session.endSession(); 

     return newStudent
      } catch (error: any) {
       await session.abortTransaction();
       await session.endSession();
       throw new Error(error)
      }
};

export const userServices = {
    createUserIntoDb
}