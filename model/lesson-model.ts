import mongoose, {Schema, ObjectId, Model} from "mongoose";
export interface ILessonDocument {
    _id: string | ObjectId
    title: string;
    description: string;
    duration: number;
    video_url: string;
    published: boolean;
    slug: string;
    access: string;
}

const lessonSchema: Schema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    duration: {
        required: true,
        type: Number
    },
    video_url: {
        required: true,
        type: String
    },
    published: {
        required: true,
        type: Boolean,
        default: false
    },
    slug: {
        required: true,
        type: String
    },
    access: {
        required: true,
        type: String
    },
});

export const Lesson: Model<ILessonDocument> = mongoose.models.Lesson ?? mongoose.model<ILessonDocument>("Lesson", lessonSchema);