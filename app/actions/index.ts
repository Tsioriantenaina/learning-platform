"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData: FormData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Canot signin, verify your credentials");
    }
}
