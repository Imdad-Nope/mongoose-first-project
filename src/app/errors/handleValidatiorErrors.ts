import mongoose from "mongoose";
import { TErrorSources, TGenericError } from "../interface/error";

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericError=>{
    const errorSources: TErrorSources = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>{
        return {
            path: value?.path,
            message: value?.message
        }
    })
    const statusCode = 400;

    return {
        statusCode,
        message: 'validation error !',
        errorSources
    }
};
