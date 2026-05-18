import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as UserModel } from "./model/user-model";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/validations/LoginValidation";
import type { User as NextAuthUser } from "next-auth";

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            authorize: async (credentials): Promise<NextAuthUser | null> => {
                const { email, password } =
                    await signInSchema.parseAsync(credentials); // Zod validation

                try {
                    const user = await UserModel.findOne({
                        email,
                    });

                    console.log("From auth => ", user);

                    if (!user) {
                        console.error("User nor found");
                        throw new Error("User not found!");
                    }

                    const isMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (!isMatch) {
                        console.error("Password Mismatch");
                        throw new Error("Check your Password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.first_name + " " + user.last_name,
                    };
                } catch (e: unknown) {
                    if (e instanceof Error) {
                        console.error(e.message);
                        throw new Error(e.message);
                    }

                    throw new Error("Authentication failed");
                }
            },
        }),
        GitHub,
        Google,
    ],
});
