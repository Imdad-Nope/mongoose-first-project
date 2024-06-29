import { boolean, z } from 'zod';

const createUserNameValidationSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' })
  });
  
  // Define the Zod schema for Guardian
  const createGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: 'Father\'s name is required' }),
    fatherOccupation: z.string().min(1, { message: 'Father\'s occupation is required' }),
    fatherContactNumber: z.string().min(1, { message: 'Father\'s contact number is required' }),
    motherName: z.string().min(1, { message: 'Mother\'s name is required' }),
    motherOccupation: z.string().min(1, { message: 'Mother\'s occupation is required' }),
    motherContactNumber: z.string().min(1, { message: 'Mother\'s contact number is required' })
  });
  
  // Define the Zod schema for LocalGuardian
  const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: 'Local guardian\'s name is required' }),
    occupation: z.string().min(1, { message: 'Local guardian\'s occupation is required' }),
    address: z.string().min(1, { message: 'Local guardian\'s address is required' }),
    contactNumber: z.string().min(1, { message: 'Local guardian\'s contact number is required' })
  });
  
  // Define the Zod schema for Student
  export const createStudentValidationSchema = z.object({
    body: z.object({
      password: z.string().max(20, {message: 'Password should no more 20 characters'}),
      student: z.object({
        name: createUserNameValidationSchema,
      gender: z.enum(["male", "female", "Others"], { errorMap: () => ({ message: '{VALUE} is not a valid gender' }) }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Email is required and must be valid' }),
      contactNumber: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNumber: z.string().optional(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().min(1, { message: 'Present address is required' }),
      permanentAddress: z.string().min(1, { message: 'Permanent address is required' }),
      guardian: createGuardianValidationSchema,
      academicSemester: z.string(),
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      })
    })

  });

// Define the zod updated schema for User name
const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }).optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' }).optional()
  });
  
  // Define the Zod updated schema for Guardian
  const updateGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: 'Father\'s name is required' }).optional(),
    fatherOccupation: z.string().min(1, { message: 'Father\'s occupation is required' }).optional(),
    fatherContactNumber: z.string().min(1, { message: 'Father\'s contact number is required' }).optional(),
    motherName: z.string().min(1, { message: 'Mother\'s name is required' }).optional(),
    motherOccupation: z.string().min(1, { message: 'Mother\'s occupation is required' }).optional(),
    motherContactNumber: z.string().min(1, { message: 'Mother\'s contact number is required' }).optional()
  });
  
  // Define the Zod updated schema for LocalGuardian
  const updateLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: 'Local guardian\'s name is required' }).optional(),
    occupation: z.string().min(1, { message: 'Local guardian\'s occupation is required' }).optional(),
    address: z.string().min(1, { message: 'Local guardian\'s address is required' }).optional(),
    contactNumber: z.string().min(1, { message: 'Local guardian\'s contact number is required' }).optional()
  });
  
  // Define the Zod updated schema for Student
  export const updateStudentValidationSchema = z.object({
    body: z.object({
      student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female", "Others"], { errorMap: () => ({ message: '{VALUE} is not a valid gender' }) }).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Email is required and must be valid' }).optional(),
      contactNumber: z.string().min(1, { message: 'Contact number is required' }).optional(),
      emergencyContactNumber: z.string().optional().optional(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().min(1, { message: 'Present address is required' }).optional(),
      permanentAddress: z.string().min(1, { message: 'Permanent address is required' }).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      academicSemester: z.string().optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      })
    })

  });




export const studentValidation ={
  createStudentValidationSchema,
  updateStudentValidationSchema
}
