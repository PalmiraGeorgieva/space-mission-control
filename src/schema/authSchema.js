import * as z from "zod";

export const registerSchema = z.object({
    email: z.string()
            .trim()
            .email()
            .min(10, 'Email must be at least 10 characters long'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    rePassword: z.string().min(4, 'Repeat password must be at least 4 characters long'),       
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match.',
    path: ['rePassword'],
});

export const loginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address.'),
    password: z.string().min(4, 'Password must be at least 4 characters long.')
});