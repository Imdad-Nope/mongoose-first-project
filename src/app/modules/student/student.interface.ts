import { Schema, model, connect, Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string
}
export type TGuardian ={
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type TLocalGuardian = {
name: string;
occupation: string;
contactNumber: string;
address: string
}


export type TStudent = {
  id: string;
  user: Types.ObjectId,
  password: string;
    name: TUserName,
    gender: "male"|"female"|"Others";
    dateOfBirth?: string;
    email: string;
    contactNumber: string;
    emergencyContactNumber?: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian,
    localGuardian: TLocalGuardian,
    profileImg?: string,
    academicSemester: Types.ObjectId,
    isDeleted: boolean,
    academicDepartment: Types.ObjectId
    academicFaculty: Types.ObjectId,
  };

  // Creating Static method ---->

 export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string) : Promise<TStudent | null>
  }