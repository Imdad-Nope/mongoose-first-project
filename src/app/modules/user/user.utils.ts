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

// 203001 0001
return lastStudentId?.id ? lastStudentId.id.substring(6) : undefined;
}
export const generatedStudentId = async (payload: TacademicSemester) =>{

    const currentId = await findLastStudentId() || (0).toString();

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId
}