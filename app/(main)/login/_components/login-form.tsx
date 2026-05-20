import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { providerMap, signIn } from "@/auth";
import { AuthError } from "next-auth";
import LoginWithCredential from "./loginWithCredential";

export function LoginForm() {
    return (
        <Card className="mx-auto max-w-sm w-full">
            <CardHeader>
                <CardTitle className="text-2xl">
                    <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
                        <span className="relative inline-flex sm:inline">
                            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                            <span className="relative">Login</span>
                        </span>
                    </p>
                </CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginWithCredential />
                {Object.values(providerMap).map((provider) => (
                    <form
                        key={provider.id}
                        action={async () => {
                            "use server";
                            try {
                                await signIn(provider.id, {
                                    redirectTo: "/courses",
                                });
                            } catch (error) {
                                // Signin can fail for a number of reasons, such as the user
                                // not existing, or the user not having the correct role.
                                // In some cases, you may want to redirect to a custom error
                                if (error instanceof AuthError) {
                                    console.error(
                                        "Authentication error:",
                                        error.message,
                                    );
                                    // return redirect(
                                    //     `${SIGNIN_ERROR_URL}?error=${error.type}`,
                                    // );
                                }

                                // Otherwise if a redirects happens Next.js can handle it
                                // so you can just re-thrown the error and let Next.js handle it.
                                // Docs:
                                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                                throw error;
                            }
                        }}
                    >
                        <button type="submit">
                            <span>Sign in with {provider.name}</span>
                        </button>
                    </form>
                ))}
            </CardContent>
        </Card>
    );
}
