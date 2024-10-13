import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistraion.service";
import { Request, Response } from "express";

const createSemesterRegistration = catchAsync(async (req: Request, res: Response)=>{

    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body);

    res.status(200).json({
        success: true,
        message: 'Semester registration created successfully !',
        data: result
    });


});

const getAllSemesterRegistrationFromDb = catchAsync(async (req, res)=>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDb(req.query);

    res.status(200).json({
        success: true,
        message: 'Semester registration got ',
       data: result
    })

});

const getSingleSemesterRegistrationFromDb =  catchAsync(async(req, res)=>{

});


const updateSemesterRegistrationIntoDb = catchAsync(async(req, res)=>{

    const {id} = req.params;
    const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDb(id, req.body);

    res.status(200).json({
        success: true,
        message: 'Semester registration updated successfully',
       data: result
    })
});

const deleteSemesterRegistrationFromDb  = catchAsync(async(req, res)=>{

});

export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDb,
    deleteSemesterRegistrationFromDb
}