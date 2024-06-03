import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student/student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true}
})

const guardianSchema = new Schema<Guardian>({
    fatherName: {type: String, required: true},
    fatherOccupation: {type: String, required: true},
    fatherContactNumber: {type: String, required: true},
    motherName: {type: String, required: true},
    motherOccupation: {type: String, required: true},
    motherContactNumber: {type: String, required: true}
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: {type: String, required: true},
    occupation: {type: String, required: true},
    address: {type: String, required: true},
    contactNumber: {type: String, required: true},

})

const studentSchema = new Schema <Student>({
    id: {type: String},
    name: userNameSchema,
    gender: ["male", "female"],
    dateOfBirth: {type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: String, required: true},
    emergencyContactNumber: {type: String},
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    presentAddress: {type: String, required: true},
    permanentAddress: {type: String, required: true},
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: {type: String},
    isActive: ["active", "blocked"]
})