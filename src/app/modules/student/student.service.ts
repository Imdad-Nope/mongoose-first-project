import { Student, studentSchema } from "./student.model";
import { TStudent } from "./student.interface";
import { populate } from "dotenv";
import mongoose from "mongoose";
import { AppError } from "../../errors/app.error";
import httpStatus, { BAD_REQUEST } from "http-status";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchStudentFields } from "./student.constant";


const getAllStudentsFromDb = async (query: Record<string, unknown>) =>{

    // // Base Query -- >
    // console.log('base query', query);

    // const queryObj = { ...query}
   

    // let searchTerm = '';

    // if(query?.searchTerm){
    //     searchTerm = query?.searchTerm as string;
    // };

    
   

    // // Filtering -->
    
    //     const excludesQuery = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    //     excludesQuery.forEach((el)=>delete queryObj[el]);
    //     console.log({query}, {queryObj})
    
    // const filteringQuery = searchStudentQuery.find(queryObj)
    // .populate('academicSemester').populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty'
    //     }
    // }); 

    // // Sorting -->
    // let sort = '-createdAt';

    // if(query?.sort){
    //     sort = query?.sort as string;
    // };

    // const sortStudentQuery = filteringQuery.sort(sort);

    // // Pagination and limit -- >

    
    // let limit = 1;
    // let page = 1;
    // let skip = 0;
    
    
    // // Pagination -->
    
    // if(query?.page){
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // };

    // // Limiting -->

   
    // if(query?.limit){
    //     limit = Number(query?.limit);
    // };
    
    // const paginationStudentQuery = sortStudentQuery.skip(skip)

    // const limitingStudentQuery = paginationStudentQuery.limit(limit);

    // // Fields -->

    // let fields = '-__v';

    // if(query.fields){
    //     fields = (query.fields as string).split(',').join(' ')
    // };

    // const queryStudentsFields = await limitingStudentQuery.select(fields);

    // return queryStudentsFields;

    // <--- Using QueryBuilder --->

    const studentQuery = new QueryBuilder(Student.find().populate('academicSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    }), query)
    .search(searchStudentFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await studentQuery.modelQuery;
    return result
}

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