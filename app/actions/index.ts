"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData: FormData) {
    return await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/courses",
    });
}
