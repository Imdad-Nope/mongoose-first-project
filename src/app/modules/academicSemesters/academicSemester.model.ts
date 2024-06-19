import { Schema, model } from "mongoose";
import { TacademicSemester, TacademicSemesterCode, Tmonths } from "./academicSemester.interface";
import { TacademicSemesterName } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";


const academicSemesterSchema = new Schema<TacademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName
    }, 
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
    }
}, {
    timestamps: true
});

// If year and name does exist in the collection then it will throw error --->

academicSemesterSchema.pre('save', async function(next){
    const isSemestersExist= await academicSemesterModel.findOne({
        year: this.year,
        name: this.name,
    })
    if(isSemestersExist){
        throw new Error('Semester does already exist')
    }
    next()
})

export const academicSemesterModel = model<TacademicSemester>('academicSemester', academicSemesterSchema);
