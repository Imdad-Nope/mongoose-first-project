import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res, next)=>{
        const {password, student: studentData} = req.body;
        const result = await userServices.createUserIntoDb(password, studentData)

        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result
        })
});

export const userControllers = {
    createUser
}