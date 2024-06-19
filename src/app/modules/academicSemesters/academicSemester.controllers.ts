import catchAsync from "../../utils/catchAsync";
import { academicSemesterService } from "./academicSemester.service";

const createAcademicSemesterControllers = catchAsync(async (req, res)=> {

const result = await academicSemesterService.createAcademicSemesterIntoDb(req.body)


  res.status(200).json({
        success: true,
        message: "Academic semester created successfully",
        data: result
    })
});

// const getAllAcademicSemesters = catchAsync(async(req, res)=>{
//     const result = await academicSemesterService.getAllAcademicSemestersFromDb(req.body)
// })

// Get single academic semester 

const getSingleAcademicSemester = catchAsync(async (req, res)=>{
    const {semesterId } = req.params;
    const result = await academicSemesterService.getSingleAcademicSemesterFromDb(semesterId);
    
    res.status(200).json({
        success: true,
        message: "Got single academic semester nicely",
        data: result
    })
});

// Updated academic semester

const updateAcademicSemester = catchAsync(async (req, res)=>{
    const {semesterId} = req.params
    const result = await academicSemesterService.updateAcademicSemesterIntoDb(semesterId, req.body);

    res.status(200).json({
        success: true,
        message: "Update academic semester nicely",
        data: result
    });
});

export const AcademicSemesterControllers = {
    createAcademicSemesterControllers,
    getSingleAcademicSemester,
    updateAcademicSemester
}