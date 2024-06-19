import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const requestValidate = (schema: AnyZodObject) =>{
    return async(req: Request, res: Response, next: NextFunction )=>{
        
        try {
            // First it check
            // If the data is valid then get next ->
            
            await schema.parseAsync({
                body: req.body
            });
            next()
        } catch (err) {
            next(err)
        }
    }
};

export default requestValidate;