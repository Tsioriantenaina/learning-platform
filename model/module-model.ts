import mongoose, {Schema, ObjectId, Model} from "mongoose";
export interface IModuleDocument {
    _id?: string | ObjectId
    title: string;
    description: string;
    status: string;
    slug: string;
    course: ObjectId;
    lessonIds: ObjectId[];
    duration?: number;
}

const moduleSchema: Schema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    slug: {
        required: true,
        type: String
    },
    course: {
        required: true,
        type: Schema.Types.ObjectId, ref: "Course"
    },
    lessonIds: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    // duration: {
    //     required: true,
    //     type: Number
    // }
});

export const Module: Model<IModuleDocument> = mongoose.models.Module ?? mongoose.model<IModuleDocument>("Module", moduleSchema);