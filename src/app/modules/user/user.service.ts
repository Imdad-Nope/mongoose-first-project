import { academicSemesterRoutes } from './../academicSemesters/academicSemester.route';
import { User } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import { academicSemesterModel } from "../academicSemesters/academicSemester.model";
import { generatedStudentId } from './user.utils';


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
    
    const admissionSemester: any = await academicSemesterModel.findById(payload.admissionSemester);
        // set a student id 
    
     userData.id = await generatedStudentId(admissionSemester)

    // create a user 
    const newUser = await User.create(userData);

    // create student 
    if (Object.keys(payload).length){
        payload.id = newUser.id;
        payload.user = newUser._id // reference object
    };

    const newStudent = await Student.create(payload)

    return newStudent
};

export const userServices = {
    createUserIntoDb
}