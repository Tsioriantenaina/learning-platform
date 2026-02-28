import mongoose, {Schema, ObjectId, Model} from "mongoose";

export interface ISocialMedia {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

export interface IUserDocument {
    _id?: string | ObjectId
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    role: string;
    phone?: string;
    bio?: string;
    social_media?: ISocialMedia;
    profile_picture?: string;
    designation?: string;
}

const userSchema: Schema = new Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
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
    role: {
        required: true,
        type: String
    },
    phone: {
        required: false,
        type: String
    },
    bio: {
        required: false,
        type: String
    },
    social_media: {
        required: false,
        type: Object
    },
    profile_picture: {
        required: false,
        type: String
    },
    designation: {
        required: false,
        type: String
    }
});

export const User: Model<IUserDocument> = mongoose.models.User ?? mongoose.model<IUserDocument>("User", userSchema);