import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as UserModel } from "./model/user-model";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/validations/LoginValidation";
import type { User as NextAuthUser } from "next-auth";
import { authConfig } from "./auth.config";
import { IPublicUser, IUserDTO } from "./types/types";
import type { Provider } from "next-auth/providers";
import { dbConnect } from "./services/mongo";

const providers: Provider[] = [
    CredentialsProvider({
        credentials: {
            email: {
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
            },
        },
        authorize: async (credentials): Promise<IPublicUser | null> => {
            const { email, password } =
                await signInSchema.parseAsync(credentials); // Zod validation

            try {
                const user = await UserModel.findOne({
                    email,
                });

                if (!user) {
                    console.error("User nor found");
                    throw new Error("User not found!");
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    console.error("Password Mismatch");
                    throw new Error("Check your Password");
                }

                return user as IPublicUser; // Exclude password from the returned user object
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
];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== "credentials");

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers,
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                await dbConnect();
                const existingUser = await UserModel.findOne({
                    email: user.email,
                });

                if (existingUser) {
                    return true; // Allow sign-in for existing users
                }

                const newUser: IUserDTO = {
                    id: user.id as string,
                    first_name: user.name?.split(" ")[0] || "",
                    last_name:
                        user.name?.split(" ")[
                            user.name?.split(" ").length - 1
                        ] || "",
                    email: user.email || "",
                    password: "", // No password for OAuth users
                    phone: "",
                    role: "student",
                    bio: "",
                    social_media: {},
                    profile_picture: user.image || "",
                    designation: "",
                    provider: account?.provider || "credentials",
                };

                await UserModel.create(newUser);

                return true;
            } catch (error) {
                return false;
            }
        },
        async jwt({ token, user }) {
            // Lors du login
            if (user) {
                const authUser = user as unknown as IPublicUser;

                token.id = authUser.id;
                token.first_name = authUser.first_name;
                token.last_name = authUser.last_name;
                token.phone = authUser.phone;
                token.bio = authUser.bio;
                token.profile_picture = authUser.profile_picture;
                token.designation = authUser.designation;
                token.role = authUser.role;
                token.social_media = authUser.social_media;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                const user = session.user as unknown as IPublicUser;

                user.id = token.id as string;
                user.first_name = token.first_name as string;
                user.last_name = token.last_name as string;
                user.phone = token.phone as string;
                user.bio = token.bio as string;
                user.profile_picture = token.profile_picture as string;
                user.designation = token.designation as string;
                user.role = token.role as string;
                user.social_media =
                    token.social_media as IPublicUser["social_media"];
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
