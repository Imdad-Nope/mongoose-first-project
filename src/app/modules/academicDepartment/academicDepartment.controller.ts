import catchAsync from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartmentController = catchAsync(async (req, res)=>{
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

    res.status(200).json({
        success: true,
        message: "Academic department is created successfully",
        data: result
    })
});

const getSingleAcademicDepartmentController = catchAsync(async(req, res)=>{
    const {departmentId} = req.params;
    const result = await academicDepartmentServices.getSingleDepartmentFromDb(departmentId);

    res.status(200).json({
        success: true,
        message: "Single academic department is found",
        data: result
    })
});

const getAllAcademicDepartmentController = catchAsync(async(req, res)=>{
    const result = await academicDepartmentServices.getAllDepartmentFromDb();

    res.status(200).json({
        success: true,
        message: "All academic department is found",
        data: result
    })
});

const updateAcademicDepartmentController = catchAsync(async(req, res)=>{
    const {departmentId} = req.params;
    const result = await academicDepartmentServices.updateDepartmentIntoDb(departmentId, req.body);

    res.status(200).json({
        success: true,
        message: "Academic department is updated",
        data: result
    })
});

export const academicDepartmentController = {
    createAcademicDepartmentController,
    getSingleAcademicDepartmentController,
    getAllAcademicDepartmentController,
    updateAcademicDepartmentController
}