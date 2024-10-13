import { Days } from './offeredCourse.constant';
import { model, Mongoose, Schema, SchemaType } from "mongoose";
import { TofferedCourse } from "./offeredCourse.interface";

const offeredCoursesModelSchema = new Schema<TofferedCourse>({
    // academicSemester: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'academicSemester'
    // },
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SemesterRegistration'
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicDepartment'
    },
    // courses: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'courses'
    // },
    // faculty: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'faculty'
    // },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: [
        {
            type: String,
            enum: Days
        }
    ],
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

export const offeredCourseModel = model<TofferedCourse>('offeredCourse',
    offeredCoursesModelSchema
)