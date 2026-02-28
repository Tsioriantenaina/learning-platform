import {NextRequest, NextResponse} from "next/server";
import {dbConnect} from "@/services/mongo";
import bcrypt from "bcryptjs";
import {isEmptyOrNullOrUndefined} from "@/lib/utils";
import {User} from "@/model/user-model";
import {userSchema} from "@/lib/validations/userValidation";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
     const body = await request.json();

     //Validation
    const result = userSchema.safeParse(body);
    if(!result.success) {
        return NextResponse.json(
            {
                errors: result.error.issues,
            },
            { status: 400 }
        );
    }
    const { first_name, last_name, password, email, role } = body;

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
    }

    console.log(newUser)

    try {
        await User.create(newUser);
        return NextResponse.json({message: "User has been created"}, {status: 201});
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message: error.message}, {status: 400});
        }
        return NextResponse.json(error, {status: 400});
    }

}