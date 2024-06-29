import { Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import {academicFacultyServices } from "./academicFaculty.service";

const createAcademicFacultyController = catchAsync(async (req, res)=>{

    const result = await academicFacultyServices.createAcademicFacultyInToDb(req.body);

    res.status(200).json({
        success: true,
        message: "Academic faculty created successfully",
        data: result
    })

});

// all faculty --

const getAllAcademicFacultyController = catchAsync(async (req, res)=>{
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDb();

    res.status(200).json({
        success: true,
        message : "Got all academic faculty",
        data: result
    })
});

// Single faculty --

const getSingleAcademicFacultyController = catchAsync(async (req, res)=>{
    const {facultyId} = req.params;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);

    res.status(200).json({
        success: true,
        message: "Got a single faculty",
        data: result
    })
});

// Update faculty -- 

const updateAcademicFacultyController = catchAsync(async (req, res)=>{
    const {facultyId} = req.params;
    const result = await academicFacultyServices.updateAcademicFaculty(facultyId,req.body);

    res.status(200).json({
        success: true,
        message: "Update academic faculty",
        data: result
    })
});

export const academicFacultyControllers = {
    createAcademicFacultyController,
    getAllAcademicFacultyController,
    getSingleAcademicFacultyController,
    updateAcademicFacultyController
}