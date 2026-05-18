import { z } from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});

export type LogingInput = z.infer<typeof signInSchema>;
