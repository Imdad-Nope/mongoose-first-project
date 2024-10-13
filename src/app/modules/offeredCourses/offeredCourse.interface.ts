import { ObjectId, Types } from "mongoose";

export type Tdays = 'sat' | 'sun' | 'mon' | 'twe' | 'wed' | 'thurs' | 'fri';

export type TofferedCourse = {
    // academicSemester?: Types.ObjectId,
    semesterRegistration: Types.ObjectId,
    academicFaculty: Types.ObjectId,
    academicDepartment: Types.ObjectId,
    // courses: Types.ObjectId,
    // faculty: Types.ObjectId,
    maxCapacity: number,
    section: number,
    days: Tdays[],
    startTime: string,
    endTime: string
};

export type Tschedules = {
    days: Tdays[],
    startTime: string,
    endTime: string
};