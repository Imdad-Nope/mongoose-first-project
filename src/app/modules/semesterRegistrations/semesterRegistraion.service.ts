import { Query } from 'mongoose';

import httpStatus, { BAD_REQUEST, PROXY_AUTHENTICATION_REQUIRED } from "http-status";
import { AppError } from "../../errors/app.error";
import { RegistrationStatus, SemesterRegistrationStatus } from "./semesterRegistration.constant";
import { semesterRegistrationSchemaModel } from "./semesterRegistration.model";
import { TSemesterRegistration } from "./semesterRegistratoin.interface";
import { academicSemesterModel } from "../academicSemesters/academicSemester.model";
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDb = async(payload: TSemesterRegistration)=>{
    /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the academicSemester is already registered!
   * Step4: Create the semester registration
   */


    // Check upcoming or ongoing registration already exist

    const academicSemester = payload?.academicSemester;

    const isSemesterRegistrationUpcomingOrOngoing = await semesterRegistrationSchemaModel.findOne({
        $or:[
          {status: RegistrationStatus.UPCOMING},
            {status: RegistrationStatus.ONGOING},
        ],
    });

    // if(isSemesterRegistrationUpcomingOrOngoing){
    //     throw new AppError(httpStatus.BAD_REQUEST,
    //         `There is already a ${isSemesterRegistrationUpcomingOrOngoing.status} registered !`
    //     )
    // };

    // Check academic semester found or not found

    const isAcademicSemesterExist = await academicSemesterModel.findById(academicSemester);

    if(!isAcademicSemesterExist){
        throw new AppError(httpStatus.NOT_FOUND,
            `Academic semester not found.`
        )
    };

    // Check semester registration already registered 

    const isSemesterRegistrationExist = await semesterRegistrationSchemaModel.findOne({academicSemester});

    if(isSemesterRegistrationExist){
        throw new AppError(httpStatus.BAD_REQUEST,
            ` This semester already registered.`
        )
    };

    const result = await semesterRegistrationSchemaModel.create(payload);

    return result;
};


const getAllSemesterRegistrationFromDb = async(query: Record<string, unknown>)=>{
    const semesterRegistrationQuery = new QueryBuilder(
        semesterRegistrationSchemaModel.find().populate('academicSemester'), query
    )
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await semesterRegistrationQuery.modelQuery;
    const meta = await semesterRegistrationQuery.countTotal();

    return{
        result,
        meta
    }
}

const getSingleSemesterRegistrationFromDb = async()=>{

};


const updateSemesterRegistrationIntoDb = async(id: string, payload: Partial<TSemesterRegistration>)=>{

    // If semester registration exists 

    const isSemesterRegistrationExists = await semesterRegistrationSchemaModel.findById(id)

    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found!')
    };

    // Current semester registration status. If registration semester is ended then we will not update anything ---

    const currentSemesterRegistration = isSemesterRegistrationExists?.status;
    const requestedRegistration = payload?.status; 

    if(currentSemesterRegistration === RegistrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, 
            `this semester is already ${currentSemesterRegistration}`
        )
    };

    // Upcoming > Ongoing > Ended

    if(currentSemesterRegistration === RegistrationStatus.UPCOMING && requestedRegistration === RegistrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, 
            `This registration cannot apply ${currentSemesterRegistration} to ${requestedRegistration}`
        )
    };

    if(currentSemesterRegistration === RegistrationStatus.ONGOING && requestedRegistration === RegistrationStatus.UPCOMING){
        throw new AppError(httpStatus.BAD_REQUEST,
            `This registration cannot apply from ${currentSemesterRegistration} to ${requestedRegistration}`
        )
    };

    const result = await semesterRegistrationSchemaModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;

};

const deleteSemesterRegistrationFromDb = async()=>{

};


export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDb,
    deleteSemesterRegistrationFromDb
}