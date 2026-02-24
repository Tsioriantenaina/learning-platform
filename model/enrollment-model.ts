import mongoose, {Schema, Model, Types} from "mongoose";
export interface IEnrollmentDocument extends Document {
    _id: Types.ObjectId;
    enrollment_date: Date;
    status: string;
    completion_date: Date;
    method: string;
    course: Types.ObjectId;
    student: Types.ObjectId;
}

const enrollmentSchema: Schema = new Schema({
    enrollment_date: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String
    },
    completion_date: {
        required: true,
        type: Date
    },
    method: {
        required: true,
        type: String
    },
    course: {
       type: Schema.Types.ObjectId, ref: "Course"
    },
    student: {
        type: Schema.Types.ObjectId, ref: "User"
    }
});

export const Enrollment: Model<IEnrollmentDocument> = mongoose.models.Enrollment ?? mongoose.model<IEnrollmentDocument>("Enrollment", enrollmentSchema);