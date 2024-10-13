import mongoose, { model, Mongoose, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistratoin.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const SemesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
       type: Schema.Types.ObjectId,
       required: true,
       unique: true,
       ref: 'academicSemester'
    },
    status: {
        type: String,
        enum: SemesterRegistrationStatus,
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: true

    },
    endDate: {
        type: Date,
        required: true
    },
    minCredit: {
        type: Number,
        default: 5
    },
    maxCredit: {
        type: Number,
        default: 15
    }

}, {
    timestamps: true
});


export const semesterRegistrationSchemaModel = mongoose. model<TSemesterRegistration> ('SemesterRegistration', SemesterRegistrationSchema)