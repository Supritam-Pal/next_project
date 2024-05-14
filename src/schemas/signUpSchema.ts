import {z} from 'zod'

export const userNameValidation = z
 .string()
 .min(2 , "Username must be atleast two characters")
 .max(20 , "Username must be maximum 20 characters")
 .regex(/^[a-zA-z0-9_]+$/ , "Username must not contain special character")


 export const signUpschema = z.object({
    username: userNameValidation,
    email: z.string().email({message:
    'Invalid email address'}),
    password: z.string().min(6 , {message: "password must be atleast 6 characters"})
 })
