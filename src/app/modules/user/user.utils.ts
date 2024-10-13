import { TacademicSemester } from "../academicSemesters/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async() =>{
    const lastStudentId = await User.findOne({
        role: 'student'
    },
{
    id: 1,
    _id: 0
}
).sort({createdAt: -1}).lean();

// 2030 01 0001
return lastStudentId?.id ? lastStudentId.id : undefined;
}
export const generatedStudentId = async (payload: TacademicSemester) =>{

    let currentId = (0).toString(); // by default 0000
    console.log(currentId, "current id is-- ")
    
    const lastStudentId = await findLastStudentId();

    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);

    const lastStudentSemesterYear = lastStudentId?.substring(0, 4);

    const currentStudentSemesterCode = payload.code;

    const currentStudentSemesterYear = payload.year;

    if(lastStudentId && lastStudentSemesterCode === currentStudentSemesterCode && lastStudentSemesterYear === currentStudentSemesterYear){
        currentId = lastStudentId.substring(6);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId
}