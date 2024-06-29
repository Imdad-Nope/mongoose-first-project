import { TAcademicDepartment } from "./academicDepartment.interface"
import { academicDepartmentModel } from "./academicDepartment.model"

// Create department ---

const createAcademicDepartmentIntoDb = async(payload: TAcademicDepartment)=>{
    const result = await academicDepartmentModel.create(payload);
    return result;
};

// Find single department --

const getSingleDepartmentFromDb = async(id: string)=>{
    const result = await academicDepartmentModel.findById(id).populate('academicFaculty');

    return result
};

// Find all department ---

const getAllDepartmentFromDb = async() =>{
    const result = await academicDepartmentModel.find().populate('academicFaculty');

    return result
};

// Update departments --

const updateDepartmentIntoDb = async (id: string, payload: Partial<TAcademicDepartment>)=>{
    const result = await academicDepartmentModel.findOneAndUpdate({_id: id}, payload, {new: true} );

    return result
};


export const academicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getSingleDepartmentFromDb,
    getAllDepartmentFromDb,
    updateDepartmentIntoDb
}

