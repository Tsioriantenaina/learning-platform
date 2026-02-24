import mongoose, {Schema, Model, Types} from "mongoose";
export interface ITestimonialDocument {
    _id: Types.ObjectId;
    content: string;
    rating: number;
    courseId?: Types.ObjectId;
    user?: Types.ObjectId;
}

const testimonialSchema: Schema = new Schema({
    content: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    courseId: {
       type: Schema.Types.ObjectId, ref: "Course"
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    }
});

export const Testimonial: Model<ITestimonialDocument> = mongoose.models.Testimonial ?? mongoose.model<ITestimonialDocument>("Testimonial", testimonialSchema);