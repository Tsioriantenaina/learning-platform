import { z } from 'zod';

export const userSchema = z.object({
    email: z
        .email("Invalid email format")
        .min(1, "Email is required"),

    first_name: z
        .string().
        nonempty("First name is required")
        .min(2, "First name must be at least 2 characters"),

    last_name: z
        .string()
        .min(2, "Last name is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

export type UserInput = z.infer<typeof userSchema>;