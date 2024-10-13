import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringSchema = z.string().refine(
    (time) =>{
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/

        return regex.test(time)
    },
   { message: 'Invalid time 24 hour format. Expected HH:MM'}
);

const createOfferedCourseValidation = z.object({
    body: z.object({
        // academicSemester: z.string(),
        semesterRegistration: z.string(),
        academicFaculty: z.string(),
        faculty: z.string(),
        courses: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: timeStringSchema,
        endTime: timeStringSchema
    }).refine(
        (body) =>{
            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`)

            return end > start
        },
        {message: 'Start time should be before the end time'}
    )
});

const updateOfferedCourseValidation = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        section: z.number().optional(),
        days: z.array(z.enum([...Days] as [string, ...string[]]).optional()),
        startTime: z.string().optional(),
        endTime: z.string().optional()
    })
})

export const offeredCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
}