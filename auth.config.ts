import { NextAuthConfig } from "next-auth";
import { IUserDTO } from "./types/types";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./lib/validations/LoginValidation";
import { User, User as UserModel } from "./model/user-model";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    providers: [],
};
