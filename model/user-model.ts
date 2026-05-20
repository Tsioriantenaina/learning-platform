import mongoose, { Schema, ObjectId, Model } from "mongoose";

export interface ISocialMedia {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

export interface IUserDocument {
    _id?: string | ObjectId;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    role: string;
    provider: string;
    phone?: string;
    bio?: string;
    social_media?: ISocialMedia;
    profile_picture?: string;
    designation?: string;
}

const userSchema: Schema = new Schema({
    first_name: {
        required: true,
        type: String,
    },
    last_name: {
        required: true,
        type: String,
    },
    password: {
        required: function () {
            return this.provider === "credentials";
        },
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
    },
    provider: {
        required: true,
        type: String,
        default: "credentials",
    },
    phone: {
        required: false,
        type: String,
    },
    bio: {
        required: false,
        type: String,
        default: "",
    },
    social_media: {
        required: false,
        type: Object,
    },
    profile_picture: {
        required: false,
        type: String,
        default: "https://i.pravatar.cc",
    },
    designation: {
        required: false,
        type: String,
        default: "",
    },
});

export const User: Model<IUserDocument> =
    mongoose.models.User ?? mongoose.model<IUserDocument>("User", userSchema);
