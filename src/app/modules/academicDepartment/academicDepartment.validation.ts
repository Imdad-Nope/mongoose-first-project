import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be needed",
            required_error: "Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic department must be needed",
            required_error: "Academic department is required"
        })
    })
});

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be needed",
            required_error: "Name is required"
        }).optional()
    }),
    academicFaculty: z.string({
       invalid_type_error: "Academic department must be needed",
            required_error: "Academic department is required"
    }).optional()
});

export const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}