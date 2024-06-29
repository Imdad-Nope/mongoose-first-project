import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
           invalid_type_error:'Faculty name must be needed'})
    })
});

const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Faculty name must be needed'
        }).optional()
    })
});

export const academicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}