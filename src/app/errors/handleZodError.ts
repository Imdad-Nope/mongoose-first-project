import { ZodError, ZodIssue } from "zod";
import { TGenericError } from "../interface/error";

export const handleZodError = (err: ZodError): TGenericError=>{
    const errorSources = err.issues.map((issue: ZodIssue)=>{
    return {
        path: issue?.path[issue?.path.length -1],
        message: issue.message
    }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'validation error',
        errorSources
    }
};