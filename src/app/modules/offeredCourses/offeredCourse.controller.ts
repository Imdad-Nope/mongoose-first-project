import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async(req: Request, res: Response)=>{
    
    const result = await offeredCourseServices.createOfferedCourseIntoDb(req.body);

    res.status(200).json({
        success: true,
        message: 'created offered course successfully !',
        data: result

    })
});

export const offeredCourseControllers = {
    createOfferedCourse
}