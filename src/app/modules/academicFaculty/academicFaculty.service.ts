import { TacademicFaculty } from './academicFaculty.interface';
import { academicFacultyModel } from './academicFaculty.model';

// Create academic Faculty ----
const createAcademicFacultyInToDb = async (payload: TacademicFaculty) =>{
    const result = await academicFacultyModel.create(payload);
    return result;
};

// Find All academic faculties ---

const getAllAcademicFacultiesFromDb = async () =>{
    const result = await academicFacultyModel.find();
    return result
};

// Find single academic faculty -- 

const getSingleAcademicFacultyFromDb = async (id: string) =>{
    const result = await academicFacultyModel.findById(id);
    return result
};

// Update academic Faculties ----

const updateAcademicFaculty = async (id: string, payload: Partial<TacademicFaculty>)=>{
    const result = await academicFacultyModel.findOneAndUpdate({_id: id}, payload, {new: true});
    return result
};

export const academicFacultyServices = {
    createAcademicFacultyInToDb,
    getAllAcademicFacultiesFromDb,
    getSingleAcademicFacultyFromDb,
    updateAcademicFaculty
}