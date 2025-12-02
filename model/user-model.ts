import mongoose, {Schema, ObjectId, Model} from "mongoose";

export interface ISocialMedia {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

export interface IUserDocument {
    _id?: string | ObjectId
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    bio?: string;
    socialMedia?: ISocialMedia;
    profilePicture?: string;
    designation?: string;
}

const userSchema: Schema = new Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    bio: {
        required: false,
        type: String
    },
    socialMedia: {
        required: false,
        type: Object
    },
    profilePicture: {
        required: false,
        type: String
    },
    designation: {
        required: false,
        type: String
    }
});

export const User: Model<IUserDocument> = mongoose.models.User ?? mongoose.model<IUserDocument>("User", userSchema);