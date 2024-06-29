import { Schema, Types, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AppError } from "../../errors/app.error";
import httpStatus from "http-status";


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "academicFaculty"
    }
},{
    timestamps: true
});


academicDepartmentSchema.pre('save', async function (next){
    const isExistDepartmentName =  await academicDepartmentModel.findOne({
        name: this.name
    })

    if(isExistDepartmentName){
        throw new AppError(httpStatus.NOT_FOUND, "Department Name is already exist! ");
    }
    next()
});

academicDepartmentSchema.pre("findOneAndUpdate", async function(next){
    const query = this.getQuery()

    const isDepartmentExist = await academicDepartmentModel.findOne(query)

    if(!isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND, "This department does not exist anymore..")
    };
    next()
})


export const academicDepartmentModel = model<TAcademicDepartment>('academicDepartment', academicDepartmentSchema)