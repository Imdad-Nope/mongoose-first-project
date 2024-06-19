import { academicSemestersCodeMapper } from "./academicSemester.constant";
import { AcademicSemesterControllers } from "./academicSemester.controllers"
import { TacademicSemester, TacademicSemesterCode, TacademicSemestersCodeMapper } from "./academicSemester.interface"
import { academicSemesterModel } from "./academicSemester.model"

const createAcademicSemesterIntoDb = async (payload: TacademicSemester) =>{

// If Code doest nod match with the Name then it will show error -- >

    if(academicSemestersCodeMapper [payload.name] !== payload.code){
        throw new Error ("Invalid code")
    }
    const result = await academicSemesterModel.create(payload);
    
    return result
    
};
//


const getAllAcademicSemestersFromDb = async()=>{
    const result = await academicSemesterModel.find();
    return result;
}

// Single id get

const getSingleAcademicSemesterFromDb = async (id: string) =>{
    const result = await academicSemesterModel.findById(id);
    return result;
}

// Updated semester

const updateAcademicSemesterIntoDb = async(id: string, payload: Partial<TacademicSemester>) =>{
   if(payload.name &&
    payload.code &&
    academicSemestersCodeMapper[payload.name] !== payload.code){
        throw new Error("Invalid semester code")
    }
    const result = await academicSemesterModel.findOneAndUpdate({_id: id }, payload,{new: true});
    return result

};

export const academicSemesterService = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemestersFromDb,
    getSingleAcademicSemesterFromDb,
    updateAcademicSemesterIntoDb
}