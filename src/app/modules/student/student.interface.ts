import { Schema, model, connect } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string
}
export type Guardian ={
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type LocalGuardian = {
name: string;
occupation: string;
contactNumber: string;
address: string
}


export type Student = {
  id: string;
    name: UserName,
    gender: "male"|"female";
    dateOfBirth?: string;
    email: string;
    contactNumber: string;
    emergencyContactNumber: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian,
    localGuardian: LocalGuardian,
    profileImg: string,
    isActive: "active"|"blocked"
  }