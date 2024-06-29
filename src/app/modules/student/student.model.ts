import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TUserName, StudentModel } from './student.interface';
import config from '../../config';
import { boolean } from 'zod';

const userNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: [true, 'First name is required'] },
    middleName: { type: String },
    lastName: { type: String, required: [true, 'Last name is required'] }
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: [true, 'Father\'s name is required'] },
    fatherOccupation: { type: String, required: [true, 'Father\'s occupation is required'] },
    fatherContactNumber: { type: String, required: [true, 'Father\'s contact number is required'] },
    motherName: { type: String, required: [true, 'Mother\'s name is required'] },
    motherOccupation: { type: String, required: [true, 'Mother\'s occupation is required'] },
    motherContactNumber: { type: String, required: [true, 'Mother\'s contact number is required'] }
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: [true, 'Local guardian\'s name is required'] },
    occupation: { type: String, required: [true, 'Local guardian\'s occupation is required'] },
    address: { type: String, required: [true, 'Local guardian\'s address is required'] },
    contactNumber: { type: String, required: [true, 'Local guardian\'s contact number is required'] },
});

export const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, 
        required: true,
        unique: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'user id is required'],
        unique: true,
        ref: 'User'
    },
    name:{
        type: userNameSchema,
        required: [true, 'name is required']
    },
    gender: {
        type: String,
        enum: ["male", "female", "Others"],
        required: true,
        message: "{VALUE} is not a valid gender",
    },
    dateOfBirth: { type: String, required: [true, 'Date of birth is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    contactNumber: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNumber: { type: String },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    presentAddress: { type: String, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian details are required']
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian details are required']
    },
    profileImg: { type: String },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'academicSemester'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    academicDepartment:{
        type: Schema.Types.ObjectId,
        ref: 'academicDepartment'
    },
},{
    toJSON: {
        virtuals: true
    }
});

studentSchema.virtual('fullName').get(function(){
   return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`
})
// Query middleware Pre --

studentSchema.pre('find', function(next){
    this.find({isDeleted: {$ne: true}})
next()
});

studentSchema.pre('findOne', function(next){
    this.findOne({isDeleted: {$ne: true} });
    next()
});

studentSchema.pre('aggregate', function(next){
   this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
    next()
});
// Create static method ---

studentSchema.statics.isUserExists = async function(id: string){
    const existingUser = await Student.findOne({id});

    return existingUser;
}


export const Student = model<TStudent, StudentModel>('Student', studentSchema);


