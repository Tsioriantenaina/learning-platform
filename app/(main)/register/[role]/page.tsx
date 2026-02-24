import SignupForm from "@/app/(main)/register/_components/signup-form";


const RegisterPage = async ({params}: {params: Promise<{role: string}>}) => {

    const { role } = await params;

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="container">
                <SignupForm role={role} />
            </div>
        </div>
    )
}
export default RegisterPage;
