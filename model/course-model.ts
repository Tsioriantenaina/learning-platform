import mongoose, {Schema, ObjectId, Model} from "mongoose";
export interface ICourseDocument {
    _id?: string | ObjectId
    title: string;
    description: string;
    thumbnail: string;
    modules: ObjectId[];
    price: number;
    active: boolean;
    category?: ObjectId;
    instructor: ObjectId;
    testimonials?: ObjectId[];
    quizSet: ObjectId;
    subtitle: string;
    learning: string[];
    createdOn: Date;
    modifiedOn?: Date;
}

const courseSchema: Schema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    },
    modules: [{type: [Schema.Types.ObjectId], ref: "Module"}],
    price: {
        required: true,
        type: Number
    },
    active: {
        required: true,
        type: Boolean
    },
    category: {
        type: Schema.Types.ObjectId, ref: "Category"
    },
    instructor: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    testimonials: [{ type: [Schema.Types.ObjectId], ref: "Testimonial" }],
    quizSet: {
        required: true,
        type: Schema.Types.ObjectId, ref: "QuizSet"
    },
    subtitle: {
        required: true,
        type: String
    },
    learning: {
        required: true,
        type: [String]
    },
    createdOn: {
        required: true,
        type: Date
    },
    modifiedOn: {
        required: true,
        type: Date
    }
});

export const Course: Model<ICourseDocument> = mongoose.models.Course ?? mongoose.model<ICourseDocument>("Course", courseSchema);